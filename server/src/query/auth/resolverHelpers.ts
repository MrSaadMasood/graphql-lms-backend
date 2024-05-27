import { generateAccessRefreshToken } from './authUtils';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import {
  AuthorizationError,
  DbError,
  InputValidationError,
} from '../../customErrors/errors';
import bcrypt from 'bcryptjs';
import pg from '../../postgresClient/pgClient';
import {
  CreateUserInput,
  LoginUserInput,
  RefreshUserInput,
} from '../../__generated__/graphql';
import oAuth2Client from '../../utils/oAuth2Client';
import env from '../../zodSchema/envValidator';
import {
  signUpUserQuery,
  storeRefreshTokenQuery,
} from '../../sqlQueries/reusedSQLQueries';
import { createGoogleUserTransaction } from '../../sqlQueries/transactions';
import { GraphQLError } from 'graphql';
import { refreshGoogleAccessToken } from '../../utils/refreshGoogleAccessToken';
import dotenv from 'dotenv';
dotenv.config();
type UserInfoToCreateToken = {
  password: string;
  id: string;
  role: UserRole;
  login_method: UserLoginMethod;
};

const { GOOGLE_CLIENT_ID, REFRESH_SECRET_USER, REFRESH_SECRET_ADMIN } = env;

export async function LoginUser(
  _parent: unknown,
  { input: { email, password } }: { input: LoginUserInput },
) {
  const user = await pg.query<UserInfoToCreateToken>(
    `select * from users where email = $1`,
    [email],
  );
  const { password: hashedPassword, role, id, login_method } = user.rows[0];

  if (login_method !== 'normal') throw new AuthorizationError();
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatch) throw new InputValidationError();
  const { accessToken, refreshToken } = generateAccessRefreshToken({
    id,
    role,
  });
  const storeRefreshToken = await pg.query(storeRefreshTokenQuery, [
    id,
    refreshToken,
  ]);
  if (!storeRefreshToken.rowCount) throw new DbError();
  return {
    accessToken,
    login_method,
    refreshToken,
    role,
  };
}

export async function SignUpUser(
  _parent: unknown,
  {
    input: { first_name, last_name, email, password, login_method },
  }: { input: CreateUserInput },
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const signuUpUser = await pg.query(signUpUserQuery, [
    uuid(),
    first_name,
    last_name,
    email,
    hashedPassword,
    'user',
    false,
    300,
    login_method,
  ]);
  if (!signuUpUser.rowCount) throw new DbError();
  return { isSuccess: true };
}

export async function GoogleLogin(
  _parent: unknown,
  { code }: { code: string },
) {
  const decodedCode = decodeURIComponent(code);
  const { tokens } = await oAuth2Client.getToken(decodedCode);
  if (!tokens || !tokens.id_token)
    throw new DbError('failed to extract tokends from google code');
  const verifiedToken = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: GOOGLE_CLIENT_ID,
  });
  const login_method = 'google';
  const googleTokens = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    login_method,
    role: 'user',
  };
  const payload = verifiedToken.getPayload();
  if (!payload) throw new DbError('no google payload after token verification');
  const { name, email, at_hash } = payload;
  const ifUserExists = await pg.query<UserInfoToCreateToken>(
    `select * from users where email = $1`,
    [email],
  );
  if (!ifUserExists) {
    if (!name || !email || !at_hash || !tokens.refresh_token)
      throw new GraphQLError(
        'insufficient information cannot proceed to create the new google user',
      );
    const [first_name, last_name] = name.split(' ');
    const userId = uuid();
    await createGoogleUserTransaction(
      first_name,
      last_name,
      email,
      at_hash,
      userId,
      tokens.refresh_token,
    );
    return googleTokens;
  }
  const storeRefreshToken = await pg.query(storeRefreshTokenQuery, [
    ifUserExists.rows[0].id,
    tokens.refresh_token,
  ]);
  if (!storeRefreshToken.rowCount) throw new DbError('google login failed');
  return googleTokens;
}

export async function RefreshUser(
  _parent: unknown,
  { input: { refreshToken, login_method, role } }: { input: RefreshUserInput },
) {
  const decodedRefreshToken = decodeURIComponent(refreshToken);
  if (login_method === 'google') {
    const credentials = await refreshGoogleAccessToken(decodedRefreshToken);
    return { accessToken: credentials.access_token };
  }
  const secretToUse =
    role === 'admin' ? REFRESH_SECRET_ADMIN : REFRESH_SECRET_USER;
  const verifiedToken = jwt.verify(decodedRefreshToken, secretToUse) as {
    id: string;
    role: UserRole;
  };
  if (!verifiedToken)
    throw new AuthorizationError('cannot renew the session! Please log in');
  const { accessToken } = generateAccessRefreshToken({
    id: verifiedToken.id,
    role: verifiedToken.role,
  });
  return {
    accessToken,
  };
}

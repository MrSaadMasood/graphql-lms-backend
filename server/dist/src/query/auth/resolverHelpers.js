var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { generateAccessRefreshToken } from '../../utils/authUtils.js';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { AuthorizationError, DbError, InputValidationError, } from '../../customErrors/errors.js';
import bcrypt from 'bcryptjs';
import pg from '../../postgresClient/pgClient.js';
import oAuth2Client from '../../utils/oAuth2Client.js';
import env from '../../zodSchema/envValidator.js';
import { signUpUserQuery, storeRefreshTokenQuery, updateUserStatusToAdminQuery, } from '../../sqlQueries/reusedSQLQueries.js';
import { createGoogleUserTransaction } from '../../sqlQueries/transactions.js';
import { GraphQLError } from 'graphql';
import { refreshGoogleAccessToken } from '../../utils/refreshGoogleAccessToken.js';
import dotenv from 'dotenv';
import pgPool from '../../postgresClient/pgClient.js';
dotenv.config();
const { GOOGLE_CLIENT_ID, REFRESH_SECRET_USER, REFRESH_SECRET_ADMIN } = env;
export function LoginUser(_parent_1, _a) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { email, password } }) {
    const user = yield pg.query(`select * from users where email = $1`, [email]);
    const { password: hashedPassword, role, id, login_method } = user.rows[0];
    if (login_method !== 'normal')
      throw new AuthorizationError();
    const passwordMatch = yield bcrypt.compare(password, hashedPassword);
    if (!passwordMatch)
      throw new InputValidationError();
    const { accessToken, refreshToken } = generateAccessRefreshToken({
      id,
      role,
    });
    const storeRefreshToken = yield pg.query(storeRefreshTokenQuery, [
      id,
      refreshToken,
    ]);
    if (!storeRefreshToken.rowCount)
      throw new DbError();
    return {
      accessToken,
      login_method,
      refreshToken,
      role,
    };
  });
}
export function SignUpUser(_parent_1, _a) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { first_name, last_name, email, password, login_method }, }) {
    const hashedPassword = yield bcrypt.hash(password, 10);
    const id = uuid();
    const signuUpUser = yield pg.query(signUpUserQuery, [
      id,
      first_name,
      last_name,
      email,
      hashedPassword,
      'user',
      'none',
      300,
      login_method,
    ]);
    if (!signuUpUser.rowCount)
      throw new DbError();
    return { isSuccess: true };
  });
}
export function GoogleLogin(_parent_1, _a) {
  return __awaiter(this, arguments, void 0, function* (_parent, { code }) {
    const decodedCode = decodeURIComponent(code);
    const { tokens } = yield oAuth2Client.getToken(decodedCode);
    if (!tokens || !tokens.id_token)
      throw new DbError('failed to extract tokends from google code');
    const verifiedToken = yield oAuth2Client.verifyIdToken({
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
    if (!payload)
      throw new DbError('no google payload after token verification');
    const { name, email, at_hash } = payload;
    const ifUserExists = yield pg.query(`select * from users where email = $1`, [email]);
    if (!ifUserExists) {
      if (!name || !email || !at_hash || !tokens.refresh_token)
        throw new GraphQLError('insufficient information cannot proceed to create the new google user');
      const [first_name, last_name] = name.split(' ');
      const userId = uuid();
      yield createGoogleUserTransaction(first_name, last_name, email, at_hash, userId, tokens.refresh_token);
      return googleTokens;
    }
    const storeRefreshToken = yield pg.query(storeRefreshTokenQuery, [
      ifUserExists.rows[0].id,
      tokens.refresh_token,
    ]);
    if (!storeRefreshToken.rowCount)
      throw new DbError('google login failed');
    return googleTokens;
  });
}
export function RefreshUser(_parent_1, _a) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { refreshToken, login_method, role } }) {
    const decodedRefreshToken = decodeURIComponent(refreshToken);
    if (login_method === 'google') {
      const credentials = yield refreshGoogleAccessToken(decodedRefreshToken);
      return { accessToken: credentials.access_token };
    }
    const secretToUse = role === 'admin' ? REFRESH_SECRET_ADMIN : REFRESH_SECRET_USER;
    const verifiedToken = jwt.verify(decodedRefreshToken, secretToUse);
    if (!verifiedToken)
      throw new AuthorizationError('cannot renew the session! Please log in');
    const { accessToken } = generateAccessRefreshToken({
      id: verifiedToken.id,
      role: verifiedToken.role,
    });
    return {
      accessToken,
    };
  });
}
export function UpgradeToAdmin(_parent_1, _a) {
  return __awaiter(this, arguments, void 0, function* (_parent, { email }) {
    const updateUserStatus = yield pgPool.query(updateUserStatusToAdminQuery, [email]);
    if (!updateUserStatus.rowCount)
      throw new DbError("failed to upgrade the status");
    return { isMadeAdmin: true };
  });
}

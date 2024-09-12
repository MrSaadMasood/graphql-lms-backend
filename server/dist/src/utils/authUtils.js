import jwt from 'jsonwebtoken';
import env from '../zodSchema/envValidator.js';
import { GraphQLError } from 'graphql';
const { ACCESS_SECRET_ADMIN, ACCESS_SECRET_USER, REFRESH_SECRET_ADMIN, REFRESH_SECRET_USER, } = env;
export function generateAccessRefreshToken(payload) {
  const accessSecretToUse = payload.role === 'admin' ? ACCESS_SECRET_ADMIN : ACCESS_SECRET_USER;
  const refreshSecretToUse = payload.role === 'admin' ? REFRESH_SECRET_ADMIN : REFRESH_SECRET_USER;
  const accessToken = jwt.sign(payload, accessSecretToUse, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, refreshSecretToUse);
  if (!accessToken || !refreshToken)
    throw new GraphQLError('failed to genreate tokens');
  return {
    accessToken,
    refreshToken,
  };
}

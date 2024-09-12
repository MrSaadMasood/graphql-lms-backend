var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { DbError } from '../customErrors/errors.js';
import pg from '../postgresClient/pgClient.js';
import { signUpUserQuery, storeRefreshTokenQuery } from './reusedSQLQueries.js';
export const createGoogleUserTransaction = (first_name, last_name, email, at_hash, userId, refresh_token) => __awaiter(void 0, void 0, void 0, function* () {
  const client = yield pg.connect();
  const errorMessage = 'new google user creation failed';
  try {
    yield client.query('BEGIN');
    const newGoogleUser = yield pg.query(signUpUserQuery, [
      userId,
      first_name,
      last_name,
      email,
      at_hash,
      'user',
      'none',
      300,
      'google',
    ]);
    const storeRefreshToken = yield pg.query(storeRefreshTokenQuery, [
      userId,
      refresh_token,
    ]);
    if (!newGoogleUser.rowCount || !storeRefreshToken.rowCount)
      throw new Error();
    yield client.query('COMMIT');
  }
  catch (error) {
    yield client.query('ROLLBACK');
    throw new DbError(errorMessage);
  }
  finally {
    client.release();
  }
});

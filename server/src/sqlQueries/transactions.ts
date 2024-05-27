import { DbError } from '../customErrors/errors';
import pg from '../postgresClient/pgClient';
import { signUpUserQuery, storeRefreshTokenQuery } from './reusedSQLQueries';

export const createGoogleUserTransaction = async <T extends string>(
  first_name: T,
  last_name: T,
  email: T,
  at_hash: T,
  userId: T,
  refresh_token: T,
) => {
  const client = await pg.connect();
  const errorMessage = 'new google user creation failed';
  try {
    await client.query('BEGIN');
    const newGoogleUser = await pg.query(signUpUserQuery, [
      userId,
      first_name,
      last_name,
      email,
      at_hash,
      'user',
      false,
      300,
      'google',
    ]);
    const storeRefreshToken = await pg.query(storeRefreshTokenQuery, [
      userId,
      refresh_token,
    ]);
    if (!newGoogleUser.rowCount || !storeRefreshToken.rowCount)
      throw new Error();
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw new DbError(errorMessage);
  } finally {
    client.release();
  }
};

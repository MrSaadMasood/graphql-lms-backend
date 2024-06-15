import { DbError, InputValidationError } from '../../customErrors/errors';
import pgPool from '../../postgresClient/pgClient';
import {
  buyMoreTokensQuery,
  consumeTokensQuery,
} from '../../sqlQueries/reusedSQLQueries';

export async function ConsumeToken(
  _parent: unknown,
  { isTestCompleted }: { isTestCompleted: boolean },
) {
  if (!isTestCompleted) throw new InputValidationError();
  const reduceTokens = await pgPool.query(consumeTokensQuery, [
    'hamza@gmail.com',
  ]);
  if (!reduceTokens.rowCount) throw new DbError('failed to consume the tokens');
  return {
    remainingTokens: reduceTokens.rows[0].free_tokens,
  };
}

export async function BuyMoreTokens() {
  const updateFreeTokens = await pgPool.query(buyMoreTokensQuery, [
    'hamza@gmail.com',
  ]);

  if (!updateFreeTokens.rowCount)
    throw new DbError('failed to add the bought tokens by user');
  return {
    remainingTokens: updateFreeTokens.rows[0].free_tokens,
  };
}

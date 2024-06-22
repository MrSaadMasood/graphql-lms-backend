import { UserContext } from '../../__generated__/types';
import { DbError, InputValidationError } from '../../customErrors/errors';
import pgPool from '../../postgresClient/pgClient';
import {
  buyMoreTokensQuery,
  consumeTokensQuery,
} from '../../sqlQueries/reusedSQLQueries';
import { requestUserExistenceVerifier } from '../../utils/helperFunctions';

export async function ConsumeToken(
  _parent: unknown,
  { isTestCompleted }: { isTestCompleted: boolean },
  context: { user: UserContext }
) {
  const user = requestUserExistenceVerifier(context.user)
  if (!isTestCompleted) throw new InputValidationError();
  const reduceTokens = await pgPool.query(consumeTokensQuery, [
    user.email,
  ]);
  if (!reduceTokens.rowCount) throw new DbError('failed to consume the tokens');
  return {
    remainingTokens: reduceTokens.rows[0].free_tokens,
  };
}

export async function BuyMoreTokens(
  _parent: unknown,
  _args: unknown,
  context: { user: UserContext }
) {
  const user = requestUserExistenceVerifier(context.user)
  const updateFreeTokens = await pgPool.query(buyMoreTokensQuery, [
    user.email,
  ]);

  if (!updateFreeTokens.rowCount)
    throw new DbError('failed to add the bought tokens by user');
  return {
    remainingTokens: updateFreeTokens.rows[0].free_tokens,
  };
}

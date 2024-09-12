var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { DbError, InputValidationError } from '../../customErrors/errors.js';
import pgPool from '../../postgresClient/pgClient.js';
import { buyMoreTokensQuery, consumeTokensQuery, } from '../../sqlQueries/reusedSQLQueries.js';
import { requestUserExistenceVerifier } from '../../utils/helperFunctions.js';
export function ConsumeToken(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { isTestCompleted }, context) {
    const user = requestUserExistenceVerifier(context.user);
    if (!isTestCompleted)
      throw new InputValidationError();
    const reduceTokens = yield pgPool.query(consumeTokensQuery, [
      user.email,
    ]);
    if (!reduceTokens.rowCount)
      throw new DbError('failed to consume the tokens');
    return {
      remainingTokens: reduceTokens.rows[0].free_tokens,
    };
  });
}
export function BuyMoreTokens(_parent, _args, context) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = requestUserExistenceVerifier(context.user);
    const updateFreeTokens = yield pgPool.query(buyMoreTokensQuery, [
      user.email,
    ]);
    if (!updateFreeTokens.rowCount)
      throw new DbError('failed to add the bought tokens by user');
    return {
      remainingTokens: updateFreeTokens.rows[0].free_tokens,
    };
  });
}

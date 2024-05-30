import { DbError, InputValidationError } from "../../customErrors/errors"
import pgPool from "../../postgresClient/pgClient"

export async function ConsumeToken(
  _parent: unknown,
  { isTestCompleted }: { isTestCompleted: boolean }
) {
  if (!isTestCompleted) throw new InputValidationError()
  const reduceTokens = await pgPool.query(`update users set free_tokens = case when free_tokens > 0 then free_tokens - 100
    when free_tokens = 0 then 0 end where email = ($1) returning free_tokens`, ["hamza@gmail.com"])
  if (!reduceTokens.rowCount) throw new DbError("failed to consume the tokens")
  return {
    remainingTokens: reduceTokens.rows[0].free_tokens
  }
}

export async function BuyMoreTokens() {
  const updateFreeTokens = await pgPool.query(`update users set free_tokens = case when free_tokens >= 0 then free_tokens 
+ 500 end, subscription_type = "temp" where email = $1 returning free_tokens`, ["hamza@gmail.com"])

  if (!updateFreeTokens.rowCount) throw new DbError("failed to add the bought tokens by user")
  return {
    remainingTokens: updateFreeTokens.rows[0].free_tokens
  }
}

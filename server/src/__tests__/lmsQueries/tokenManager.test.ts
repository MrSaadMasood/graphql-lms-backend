import { apiPost } from "../testUtils/testUtils"

describe("test the tokens update and consumption", () => {
  const consumeTokenQuery = {
    query: `mutation($isTestCompleted: Boolean!) {
      ConsumeToken(isTestCompleted: $isTestCompleted) {
    remainingTokens
  }
}`,
    variables: {
      isTestCompleted: true
    }
  }
  it("should successfully consume the token on test completion", async () => {
    const response = await apiPost(consumeTokenQuery)
    expect(response.body.data.ConsumeToken.remainingTokens).toBeGreaterThanOrEqual(0)
  })

  it("negative: should throw an error if input provided is not correct / true", async () => {
    consumeTokenQuery.variables.isTestCompleted = false
    const response = await apiPost(consumeTokenQuery)
    expect(response.body.data).toBeNull()
    expect(response.body.errors).toHaveLength(1)

  })

})

describe("tests buying more tokens functionlity", () => {
  const buyMoreTokensQuery = {
    query: `mutation{
      BuyMoreTokens {
    remainingTokens
  }
}`,
    variables: {}
  }
  it("should update the free tokens of the user", async () => {
    const response = await apiPost(buyMoreTokensQuery)
     
    expect(response.body.data).toEqual({
      BuyMoreTokens: expect.objectContaining({
        remainingTokens: expect.any(Number)
      })
    })
    expect(response.body.data.BuyMoreTokens.remainingTokens).toBeGreaterThan(0)
  })
})


import { apiPost } from "../testUtils/testUtils"

describe("test if the user data is returned", () => {
  const getUserDataQuery = {
    query: `query{
      GetUserData {
    free_tokens,
    role,
    subscription_type
   }
}`,
    variables: {}
  }
  it("should return the user data requested", async () => {
    const response = await apiPost(getUserDataQuery)
    expect(response.body.data.GetUserData).toEqual(expect.objectContaining({
      free_tokens: expect.any(Number),
      subscription_type: expect.any(String),
      role: expect.any(String)
    }))
  })
})


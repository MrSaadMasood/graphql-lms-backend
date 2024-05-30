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

describe("tests the getting of user personal test data", () => {
  const getUserTestDataQuery = {
    query: ``,
    variables: {}
  }
  it("should return the user specific data that is both general and subject wise", async () => {
    const response = await apiPost(getUserTestDataQuery)
    expect(response.body.data.GetUserPersonalTestData).toEqual(expect.objectContaining({
      general: expect.any(Object),
      subjectWise: expect.any(Object)
    }))
    expect(response.body.data.GetUserPersonalTestData.general).toHaveLength(1)
    expect(response.body.data.GetUserPersonalTestData.subjectWise).toHaveLength(3)
  })
})

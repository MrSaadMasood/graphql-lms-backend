import { apiPost } from "../testUtils/testUtils"

describe("tests the getting of user personal test data", () => {
  const getUserTestDataQuery = {
    query: `query{
      GetUserPersonalTestData {
        general {
          total_correct,
          date
        },
      }
    }`,
    variables: {}
  }
  it("should return the user specific data that is both general and subject wise", async () => {
    const response = await apiPost(getUserTestDataQuery)
     
    expect(response.body.data.GetUserPersonalTestData.general[0]).toEqual(expect.objectContaining({
      date: expect.any(String),
      total_correct: expect.any(Number)
    }))
    expect(response.body.data.GetUserPersonalTestData.general).toHaveLength(1)
  })
})

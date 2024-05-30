import { UserTestDataInput } from "../../__generated__/graphql"
import { apiPost } from "../testUtils/testUtils"

describe("tests the storing of user data functionlity", () => {
  const userTestData: UserTestDataInput = {
    totalSolved: 4,
    totalCorrect: 3,
    totalWrong: 1,
    subject: "English"
  }
  const storeUserTestDataQuery = {
    query: `mutation($input: UserTestDataInput!){
      SaveUserTestData(input: $input)
    }`,
    variables: {
      input: userTestData
    }
  }
  it("should store the personal user data in the database", async () => {
    const response = await apiPost(storeUserTestDataQuery)
    expect(response.body.data.SaveUserTestData).toBe(true)
  })

  it("should fail to store the user personal data if the userId is incorrect", async () => {
    // const response = await apiPost(storeUserTestDataQuery)
    // expect(response.body.data.SaveUserTestData).toBe(true)
  })
})

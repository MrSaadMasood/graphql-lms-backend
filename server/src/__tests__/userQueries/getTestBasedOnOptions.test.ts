import { GetTestOptions } from "../../__generated__/graphql"
import { apiPost } from "../testUtils/testUtils"

describe("test the get test based on option route", () => {
  const getTestBasedOnOptionsInput: GetTestOptions = {
    paperCategory: "IELTS",
    academyName: "British Council",
    paperYear: 0,
    paperSubject: "",
    giveRandomTest: false,
    limit: 0
  }
  const testBasedOnOptionsQuery = {
    query: `query($input: GetTestOptions!){
      GetTestBasedOnOptions(input: $input) {
        id,
        option_a,
        option_c,
        paper_year
      }
}`,
    variables: {
      input: getTestBasedOnOptionsInput
    }
  }
  it("should return the tests based on the paper_year", async () => {
    testBasedOnOptionsQuery.variables.input.paperYear = 2021
    const response = await apiPost(testBasedOnOptionsQuery)
    expect(response.body.data.GetTestBasedOnOptions.length).toBeGreaterThan(1)
    expect(response.body.data.GetTestBasedOnOptions[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      option_a: expect.any(String),
      option_c: expect.any(String),
      paper_year: 2021
    }))
  })

  it("should return the tests based on the subject selected", async () => {
    testBasedOnOptionsQuery.variables.input.paperSubject = "English"
    const response = await apiPost(testBasedOnOptionsQuery)
    expect(response.body.data.GetTestBasedOnOptions.length).toBeGreaterThan(1)
    expect(response.body.data.GetTestBasedOnOptions[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      option_a: expect.any(String),
      option_c: expect.any(String),
      paper_year: 2021
    }))
  })

  it("should return the random MCQS", async () => {
    testBasedOnOptionsQuery.variables.input.giveRandomTest = true
    testBasedOnOptionsQuery.variables.input.limit = 20
    const response = await apiPost(testBasedOnOptionsQuery)
    expect(response.body.data.GetTestBasedOnOptions.length).not.toBeGreaterThan(20)
    expect(response.body.data.GetTestBasedOnOptions[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      option_a: expect.any(String),
      option_c: expect.any(String),
    }))
  })

  it("should return no more than 20 mcqs if the limit is not provided", async () => {
    testBasedOnOptionsQuery.variables.input.giveRandomTest = true
    testBasedOnOptionsQuery.variables.input.limit = 0
    const response = await apiPost(testBasedOnOptionsQuery)
    expect(response.body.data.GetTestBasedOnOptions.length).not.toBeGreaterThan(20)
    expect(response.body.data.GetTestBasedOnOptions[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      option_a: expect.any(String),
      option_c: expect.any(String),
    }))
  })

  it("should throw an error if incorrect options are provided", async () => {
    testBasedOnOptionsQuery.variables.input.paperYear = 0
    testBasedOnOptionsQuery.variables.input.paperSubject = ""
    testBasedOnOptionsQuery.variables.input.giveRandomTest = false
    const error = await apiPost(testBasedOnOptionsQuery)
     
    expect(error.body.errors).toHaveLength(1)
  })
})

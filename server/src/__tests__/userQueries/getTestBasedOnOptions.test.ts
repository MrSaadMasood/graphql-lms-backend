import { apiPost } from "../testUtils/testUtils"

describe("test the get test based on option route", () => {
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
      input: {
        paperCategory: "IELTS",
        academyName: "British Council",
        paper_year: 0,
        paperSubject: "",
        giveRandomTest: false,
        limit: 0
      }
    }
  }
  it("should return the tests based on the paper_year", async () => {
    testBasedOnOptionsQuery.variables.input.paper_year = 2021
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
      subject: "English"
    }))
  })

  it("should return the random MCQS", async () => {
    testBasedOnOptionsQuery.variables.input.giveRandomTest = true
    testBasedOnOptionsQuery.variables.input.limit = 20
    const response = await apiPost(testBasedOnOptionsQuery)
    expect(response.body.data.GetTestBasedOnOptions.length).toHaveLength(20)
    expect(response.body.data.GetTestBasedOnOptions[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      option_a: expect.any(String),
      option_c: expect.any(String),
    }))
  })

  it("should throw an error if the limit is not provided for random MCQs", async () => {
    testBasedOnOptionsQuery.variables.input.giveRandomTest = true
    testBasedOnOptionsQuery.variables.input.limit = 0
    const errors = await apiPost(testBasedOnOptionsQuery)
    expect(errors.body.errors).toHaveLength(1)
  })

  it("should throw an error if incorrect options are provided", async () => {
    const error = await apiPost(testBasedOnOptionsQuery)
    expect(error.body.errors).toHaveLength(1)
  })
})

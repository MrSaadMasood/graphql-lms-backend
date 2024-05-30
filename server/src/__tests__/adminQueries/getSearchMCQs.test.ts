import { TestSearchFilters } from "../../__generated__/graphql"
import { apiPost } from "../testUtils/testUtils"

describe("tests the get test mcqs based on the filter options provided", () => {
  const filter: TestSearchFilters = {
    paperYear: null,
    searchText: "whi",
    paperSubject: null,
    academyName: "British Council"
  }
  const searchedMCQSQueries = {
    query: `query($input: TestSearchFilters!){
      SearchMCQBasedOnFilters(input: $input) {
        id,
        statement
      }
    }`,
    variables: {
      input: filter
    }
  }

  it("should return the filtered mcqs based on the searchText only", async () => {
    const response = await apiPost(searchedMCQSQueries)
    expect(response.body.data.SearchMCQBasedOnFilters).toHaveLength(2)
    expect(response.body.data.SearchMCQBasedOnFilters[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      statement: expect.any(String)
    }))
  })

  it("should return the filtered mcqs based on the searched text, paper year", async () => {
    searchedMCQSQueries.variables.input.paperYear = 2021
    const response = await apiPost(searchedMCQSQueries)
    expect(response.body.data.SearchMCQBasedOnFilters).toHaveLength(2)
  })

  it("should return the filtered mcqs based on the searched text, paper year, subject", async () => {
    searchedMCQSQueries.variables.input.paperYear = 2021
    searchedMCQSQueries.variables.input.paperSubject = "English"
    const response = await apiPost(searchedMCQSQueries)
    expect(response.body.data.SearchMCQBasedOnFilters).toHaveLength(1)
  })
})

import { api } from "../testUtils/testUtils"

describe("tests the data population using the csv file uplaod functionality", () => {

  it("should add the data successfully form the table in the csv file", async () => {
    const response = await api.post("/upload").attach("csv", "../testUtils/test_csv.csv")
    console.log("the reponse is", response.body)
    expect(response.body).toBe(19)
  })

  it("should throw an error if file other than csv is provided", async () => {
    const error = await api.post("/uplaod").attach("csv", "../../../README.md")
    console.log("the reponse is", error.body)
    expect(error.body).toBe("failed to load the data the File")
  })

})

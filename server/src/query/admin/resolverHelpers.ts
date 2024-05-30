import { McqSearchResult, TestSearchFilters, UpdateMcqInput } from "../../__generated__/graphql";
import { DbError, InputValidationError } from "../../customErrors/errors";
import pgPool from "../../postgresClient/pgClient";
import { searchMCQBasedOnFiltersQuery } from "../../sqlQueries/reusedSQLQueries";


export async function SearchMCQBasedOnFilters(
  _parent: unknown,
  { input: { academyName, paperYear, paperSubject, searchText } }: { input: TestSearchFilters }
) {
  const searchedMCQs = await pgPool.query<McqSearchResult>(
    searchMCQBasedOnFiltersQuery, [searchText, academyName, paperYear, paperSubject])
  if (!searchedMCQs.rowCount) throw new DbError("failed to get the filtered mcqs")
  console.log("the searched mcqs are", searchedMCQs.rows)
  return searchedMCQs.rows
}

export async function GetSpecificMCQ(
  _parent: unknown,
  { id }: { id: number }
) {
  const specificMCQ = await pgPool.query<UpdateMcqInput>(`select id, statement, option_a, option_b, option_c
  , correct, explanation, subject, difficulty, paper_year, paper_category where id = $1`, [id])
  if (!specificMCQ.rowCount) throw new DbError("failed to get the desired mcq")
  return specificMCQ.rows[0]
}

export async function UpdateTestMCQ(
  _parent: unknown,
  { input:
    { id, statement, option_a, option_b, option_c, correct, explanation, subject, difficulty, paper_year, paper_category } }
    : { input: UpdateMcqInput }
) {
  if (!id || !statement || !option_a || !option_b || !option_c || !correct || !explanation || !subject || !difficulty
    || !paper_year || !paper_category) throw new InputValidationError()
  const updateMcq = await pgPool.query(`update from test_data set statement = $2, option_a = $3,
  option_b = $4, option_c = $5, correct = $6, explanation = $7, subject = $8, difficulty = $9, paper_year = $10,
  paper_category = $11)`,
    [id, statement, option_a, option_b, option_c, correct, explanation, subject, difficulty, paper_year,
      paper_category])
  if (!updateMcq.rowCount) throw new DbError("Failed to update the mcq")
  return true
}

export async function DeleteTestMCQ(
  _parent: unknown,
  { id }: { id: string }
) {
  const deletedMCQ = await pgPool.query(`delete from test_data where id = $1`, [id])
  if (!deletedMCQ.rowCount) throw new DbError("failed to delete the requested mcq")
  return true
}

export async function GetAllMCQBasedOnAcademy(
  _parent: unknown,
  { academyName, offset }: { academyName: string, offset: number }
) {
  console.log("the allMcqsOfAcademy", typeof offset)
  const allMcqsOfAcademy = await pgPool.query(
    `select id, statement from test_data where academy_name = $1 limit 10 offset $2;`, [academyName, offset])

  console.log("the allMcqsOfAcademy", allMcqsOfAcademy.rows)
  if (!allMcqsOfAcademy.rowCount) throw new DbError("failed to get the mcqs of the desired academy")
  return allMcqsOfAcademy.rows
}





import {
  McqSearchResult,
  TestSearchFilters,
  UpdateMcqInput,
} from '../../__generated__/graphql';
import { DbError, InputValidationError } from '../../customErrors/errors';
import pgPool from '../../postgresClient/pgClient';
import {
  deleteTestMCQQuery,
  getAllMCQBasedOnAcademyQuery,
  getSpecificMCQQuery,
  searchMCQBasedOnFiltersQuery,
  updateTestMCQQuery,
} from '../../sqlQueries/reusedSQLQueries';

export async function SearchMCQBasedOnFilters(
  _parent: unknown,
  {
    input: { academyName, paperYear, paperSubject, searchText },
  }: { input: TestSearchFilters },
) {
  const searchedMCQs = await pgPool.query<McqSearchResult>(
    searchMCQBasedOnFiltersQuery,
    [searchText, academyName, paperYear, paperSubject],
  );
  if (!searchedMCQs.rowCount)
    throw new DbError('failed to get the filtered mcqs');

  return searchedMCQs.rows;
}

export async function GetSpecificMCQ(_parent: unknown, { id }: { id: number }) {
  const specificMCQ = await pgPool.query<UpdateMcqInput>(getSpecificMCQQuery, [
    id,
  ]);
  if (!specificMCQ.rowCount) throw new DbError('failed to get the desired mcq');
  return specificMCQ.rows[0];
}

export async function UpdateTestMCQ(
  _parent: unknown,
  {
    input: {
      id,
      statement,
      option_a,
      option_b,
      option_c,
      correct,
      explanation,
      subject,
      difficulty,
      paper_year,
      paper_category,
    },
  }: { input: UpdateMcqInput },
) {
  if (
    !id ||
    !statement ||
    !option_a ||
    !option_b ||
    !option_c ||
    !correct ||
    !explanation ||
    !subject ||
    !difficulty ||
    !paper_year ||
    !paper_category
  )
    throw new InputValidationError();
  const updateMcq = await pgPool.query(updateTestMCQQuery, [
    id,
    statement,
    option_a,
    option_b,
    option_c,
    correct,
    explanation,
    subject,
    difficulty,
    paper_year,
    paper_category,
  ]);
  if (!updateMcq.rowCount) throw new DbError('Failed to update the mcq');
  return true;
}

export async function DeleteTestMCQ(_parent: unknown, { id }: { id: string }) {
  const deletedMCQ = await pgPool.query(deleteTestMCQQuery, [id]);
  if (!deletedMCQ.rowCount)
    throw new DbError('failed to delete the requested mcq');
  return true;
}

export async function GetAllMCQBasedOnAcademy(
  _parent: unknown,
  { academyName, offset }: { academyName: string; offset: number },
) {
  const allMcqsOfAcademy = await pgPool.query(getAllMCQBasedOnAcademyQuery, [
    academyName,
    offset,
  ]);
  if (!allMcqsOfAcademy.rowCount)
    throw new DbError('failed to get the mcqs of the desired academy');
  return allMcqsOfAcademy.rows;
}

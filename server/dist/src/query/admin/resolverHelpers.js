var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { DbError, InputValidationError } from '../../customErrors/errors.js';
import pgPool from '../../postgresClient/pgClient.js';
import { deleteTestMCQQuery, getAllMCQBasedOnAcademyQuery, getSpecificMCQQuery, searchMCQBasedOnFiltersQuery, updateTestMCQQuery, } from '../../sqlQueries/reusedSQLQueries.js';
import { requestUserExistenceVerifier } from '../../utils/helperFunctions.js';
export function SearchMCQBasedOnFilters(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { academyName, paperYear, paperSubject, searchText }, }, context) {
    requestUserExistenceVerifier(context.user, true);
    const searchedMCQs = yield pgPool.query(searchMCQBasedOnFiltersQuery, [searchText, academyName, paperYear, paperSubject]);
    if (!searchedMCQs.rowCount)
      throw new DbError('failed to get the filtered mcqs');
    return searchedMCQs.rows;
  });
}
export function GetSpecificMCQ(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { id }, context) {
    requestUserExistenceVerifier(context.user, true);
    const specificMCQ = yield pgPool.query(getSpecificMCQQuery, [
      id,
    ]);
    if (!specificMCQ.rowCount)
      throw new DbError('failed to get the desired mcq');
    return specificMCQ.rows[0];
  });
}
export function UpdateTestMCQ(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { id, statement, option_a, option_b, option_c, correct, explanation, subject, difficulty, paper_year, paper_category, }, }, context) {
    requestUserExistenceVerifier(context.user, true);
    if (!id ||
      !statement ||
      !option_a ||
      !option_b ||
      !option_c ||
      !correct ||
      !explanation ||
      !subject ||
      !difficulty ||
      !paper_year ||
      !paper_category)
      throw new InputValidationError();
    const updateMcq = yield pgPool.query(updateTestMCQQuery, [
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
    if (!updateMcq.rowCount)
      throw new DbError('Failed to update the mcq');
    return true;
  });
}
export function DeleteTestMCQ(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { id }, context) {
    requestUserExistenceVerifier(context.user, true);
    const deletedMCQ = yield pgPool.query(deleteTestMCQQuery, [id]);
    if (!deletedMCQ.rowCount)
      throw new DbError('failed to delete the requested mcq');
    return true;
  });
}
export function GetAllMCQBasedOnAcademy(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { academyName, offset }, context) {
    requestUserExistenceVerifier(context.user, true);
    const allMcqsOfAcademy = yield pgPool.query(getAllMCQBasedOnAcademyQuery, [
      academyName,
      offset,
    ]);
    if (!allMcqsOfAcademy.rowCount)
      throw new DbError('failed to get the mcqs of the desired academy');
    return allMcqsOfAcademy.rows;
  });
}

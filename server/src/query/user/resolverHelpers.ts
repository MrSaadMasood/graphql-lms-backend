import { GetTestOptions, TestDataSent, UserTestDataInput } from "../../__generated__/graphql";
import { DbError, InputValidationError } from "../../customErrors/errors";
import pgPool from "../../postgresClient/pgClient";


export async function GetUserData() {
  const userData = await pgPool.query(`select first_name || ' ' || last_name as full_name , 
   role, subscription_type, login_method, free_tokens from users where email = $1`, ["hamza@gmail.com"])
  if (!userData.rowCount) throw new DbError("failed to get the user Data")
  return userData.rows[0]
}

export async function GetTestBasedOnOptions(
  _parent: unknown,
  { input }: { input: GetTestOptions }
) {
  const { paperCategory, paperYear, paperSubject, giveRandomTest, academyName, limit } = input
  if (paperYear) {
    const specificYearPaper = await pgPool.query<TestDataSent>(
      `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject
      from test_data where paper_year = $1 and paper_category = $2 and academy_name = $3`
      , [paperYear, paperCategory, academyName])
    if (!specificYearPaper.rowCount) throw new DbError("failed to get the specific year test")
    return specificYearPaper.rows
  }
  if (paperSubject) {
    const specificSubjectMCQ = await pgPool.query<TestDataSent>(
      `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject
      from test_data where paper_category = $1 and academy_name = $2 and subject = $3`
      , [paperCategory, academyName, paperSubject])
    if (!specificSubjectMCQ.rowCount) throw new DbError("failed to get the specific year test")
    return specificSubjectMCQ.rows

  }
  if (giveRandomTest) {
    const randomMCQ = await pgPool.query<TestDataSent>(
      `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject 
      from test_data where paper_category = $1 and academy_name = $2 order by random()
      limit $3`, [paperCategory, academyName, limit])
    if (!randomMCQ.rowCount) throw new DbError("failed to get the random tests")
    return randomMCQ.rows
  }
  throw new InputValidationError("inputs provided are incorrect")
}

export async function SaveUserTestData(
  _parent: unknown,
  { input: { totalSolved, totalWrong, totalCorrect, subject } }: { input: UserTestDataInput }
) {
  const savedUserTestData = await pgPool.query(`insert into user_overall_data (
      userId,
      subject,
      total_solved,
      total_correct,
      total_incorrect
      ) values ($1, $2, $3, $4, $5)`, ['f415284b-87b4-4206-a79f-5bd61b00de97'
    , subject, totalSolved, totalCorrect, totalWrong])
  if (!savedUserTestData.rowCount) throw new DbError("failed to save the user data")
  return true
}

export async function GetUserPersonalTestData() {
  const userGeneralTestData = await pgPool.query(`select sum(total_solved) as total_solved,
  sum(total_correct) as total_correct, sum(total_incorrect) as total_incorrect, date from user_overall_data
  where userId = $1 group by date`, ['f415284b-87b4-4206-a79f-5bd61b00de97'])
  const userSubjectWiseTestData = await pgPool.query(`select subject, sum(total_solved) as total_solved, 
  sum(total_correct) as total_correct, sum(total_incorrect) as total_incorrect, date from user_overall_data
  where userId = $1 group by subject, date`, ['f415284b-87b4-4206-a79f-5bd61b00de97'])
  if (!userGeneralTestData.rowCount || !userSubjectWiseTestData.rowCount) throw new DbError(
    "failed to get the personalized user data"
  )
  return {
    general: userGeneralTestData.rows,
    subjectWise: userSubjectWiseTestData.rows
  }
}

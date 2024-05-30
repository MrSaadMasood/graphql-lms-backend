export const signUpUserQuery = `insert into users(
  id, 
  first_name, 
  last_name, 
  email, 
  password, 
  role, 
  subscription_type,
  free_tokens, 
  login_method)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

export const storeRefreshTokenQuery = `insert into tokens(id, token) values ($1, $2)`;

export const addTestDataQuery = `insert into test_data(
    subject,
    paper_category,
    academy_name,
    statement,
    option_a,
    option_b,
    option_c,
    correct,
    explanation,
    paper_year,
    difficulty 
) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 )`;

export const searchMCQBasedOnFiltersQuery =
  `select id, statement, subject from test_data where
  statement ~* $1 and academy_name = $2 and (paper_year = $3 or $3 is null) 
  and (subject = $4 or $4 is null)`

export const getSpecificMCQQuery = `select id, statement, option_a, option_b, option_c
  , correct, explanation, subject, difficulty, paper_year, paper_category from test_data where id = $1`

export const updateTestMCQQuery = `update test_data set statement = $2, option_a = $3,
  option_b = $4, option_c = $5, correct = $6, explanation = $7, subject = $8, difficulty = $9, paper_year = $10,
  paper_category = $11 where id = $1`

export const deleteTestMCQQuery = `delete from test_data where id = $1`

export const getAllMCQBasedOnAcademyQuery = `select id, statement from test_data where academy_name = $1 limit 10 offset $2;`

export const getUserDataQuery = `select first_name || ' ' || last_name as full_name , 
   role, subscription_type, login_method, free_tokens from users where email = $1`

export const testBasedOnPaperYearQuery = `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject
      from test_data where paper_year = $1 and paper_category = $2 and academy_name = $3`

export const testBasedOnSubjectQuery = `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject
      from test_data where paper_category = $1 and academy_name = $2 and subject = $3`

export const testBasedOnRandomOption = `select id, statement, option_a, option_b, option_c
      , correct, explanation, difficulty, paper_year, subject 
      from test_data where paper_category = $1 and academy_name = $2 order by random()
      limit $3`

export const saveUserTestDataQuery = `insert into user_overall_data (
      userId,
      subject,
      total_solved,
      total_correct,
      total_incorrect
      ) values ($1, $2, $3, $4, $5)`

export const getUserGeneralTestDataQuery = `select sum(total_solved) as total_solved,
  sum(total_correct) as total_correct, sum(total_incorrect) as total_incorrect, date from user_overall_data
  where userId = $1 group by date`

export const getUserSubjectWiseTestDataQuery = `select subject, sum(total_solved) as total_solved, 
  sum(total_correct) as total_correct, sum(total_incorrect) as total_incorrect, date from user_overall_data
  where userId = $1 group by subject, date`

export const consumeTokensQuery = `update users set free_tokens = case when free_tokens > 0 then free_tokens - 100
    when free_tokens = 0 then 0 end where email = ($1) returning free_tokens`

export const buyMoreTokensQuery = `update users set free_tokens = case when free_tokens >= 0 then free_tokens 
    + 500 end, subscription_type = 'temp' where email = $1 returning free_tokens`

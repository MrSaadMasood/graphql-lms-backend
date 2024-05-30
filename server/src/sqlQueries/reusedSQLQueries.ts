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
    statement,
    option_a,
    option_b,
    option_c,
    correct,
    explanation,
    paper_year,
    difficulty 
) values ($1, $2, $3, $4, $5, $6, $7, $8, $9 )`;

export const searchMCQBasedOnFiltersQuery =
  `select id, statement, subject from test_data where
  statement ~* $1 and academy_name = $2 and (paper_year = $3 or $3 is null) 
  and (subject = $4 or $4 is null)`

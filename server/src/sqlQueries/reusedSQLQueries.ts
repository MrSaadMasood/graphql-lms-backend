export const signUpUserQuery = `insert into users(
  id, 
  first_name, 
  last_name, 
  email, 
  password, 
  role, 
  is_subscribed, 
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

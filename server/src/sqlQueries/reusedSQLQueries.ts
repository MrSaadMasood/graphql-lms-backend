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

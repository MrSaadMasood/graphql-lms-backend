export const signUpUserQuery = `
  INSERT INTO users (
    id, 
    first_name, 
    last_name, 
    email, 
    password, 
    role, 
    subscription_type,
    free_tokens, 
    login_method
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
  RETURNING *;
`;

export const storeRefreshTokenQuery = `
  INSERT INTO tokens (
    id, 
    token
  ) VALUES ($1, $2);
`;

export const addTestDataQuery = `
  INSERT INTO test_data (
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
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
`;

export const searchMCQBasedOnFiltersQuery = `
  SELECT 
    id, 
    statement, 
    subject 
  FROM test_data 
  WHERE
    statement ~* $1 
    AND academy_name = $2 
    AND (paper_year = $3 OR $3 IS NULL) 
    AND (subject = $4 OR $4 IS NULL);
`;

export const getSpecificMCQQuery = `
  SELECT 
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
    paper_category 
  FROM test_data 
  WHERE id = $1;
`;

export const updateTestMCQQuery = `
  UPDATE test_data 
  SET 
    statement = $2, 
    option_a = $3,
    option_b = $4, 
    option_c = $5, 
    correct = $6, 
    explanation = $7, 
    subject = $8, 
    difficulty = $9, 
    paper_year = $10,
    paper_category = $11 
  WHERE id = $1;
`;

export const deleteTestMCQQuery = `
  DELETE FROM test_data 
  WHERE id = $1;
`;

export const getAllMCQBasedOnAcademyQuery = `
  SELECT 
    id, 
    statement 
  FROM test_data 
  WHERE academy_name = $1 
  LIMIT 10 
  OFFSET $2;
`;

export const getUserDataQuery = `
  SELECT 
    first_name || ' ' || last_name AS full_name, 
    role, 
    subscription_type, 
    login_method, 
    free_tokens 
  FROM users 
  WHERE email = $1;
`;

export const testBasedOnPaperYearQuery = `
  SELECT 
    id, 
    statement, 
    option_a, 
    option_b, 
    option_c, 
    correct, 
    explanation, 
    difficulty, 
    paper_year, 
    subject 
  FROM test_data 
  WHERE 
    paper_year = $1 
    AND paper_category = $2 
    AND academy_name = $3;
`;

export const testBasedOnSubjectQuery = `
  SELECT 
    id, 
    statement, 
    option_a, 
    option_b, 
    option_c, 
    correct, 
    explanation, 
    difficulty, 
    paper_year, 
    subject 
  FROM test_data 
  WHERE 
    paper_category = $1 
    AND academy_name = $2 
    AND subject = $3;
`;

export const testBasedOnRandomOption = `
  SELECT 
    id, 
    statement, 
    option_a, 
    option_b, 
    option_c, 
    correct, 
    explanation, 
    difficulty, 
    paper_year, 
    subject 
  FROM test_data 
  WHERE 
    paper_category = $1 
    AND academy_name = $2 
  ORDER BY random() 
  LIMIT $3;
`;

export const saveUserTestDataQuery = `
  INSERT INTO user_overall_data (
    userId,
    subject,
    total_solved,
    total_correct,
    total_incorrect
  ) VALUES ($1, $2, $3, $4, $5);
`;

export const getUserGeneralTestDataQuery = `
  SELECT 
    SUM(total_solved) AS total_solved,
    SUM(total_correct) AS total_correct, 
    SUM(total_incorrect) AS total_incorrect, 
    date 
  FROM user_overall_data
  WHERE userId = $1 
  GROUP BY date;
`;

export const getUserSubjectWiseTestDataQuery = `
  SELECT 
    subject, 
    SUM(total_solved) AS total_solved, 
    SUM(total_correct) AS total_correct, 
    SUM(total_incorrect) AS total_incorrect, 
    date 
  FROM user_overall_data
  WHERE userId = $1 
  GROUP BY subject, date;
`;

export const consumeTokensQuery = `
  UPDATE users 
  SET 
    free_tokens = CASE 
      WHEN free_tokens > 0 THEN free_tokens - 100
      WHEN free_tokens = 0 THEN 0 
    END 
  WHERE email = $1 
  RETURNING free_tokens;
`;

export const buyMoreTokensQuery = `
  UPDATE users 
  SET 
    free_tokens = CASE 
      WHEN free_tokens >= 0 THEN free_tokens + 500 
    END, 
    subscription_type = 'temp' 
  WHERE email = $1 
  RETURNING free_tokens;
`;

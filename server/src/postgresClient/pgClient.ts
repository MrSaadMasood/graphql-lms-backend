import pg from 'pg';
import env from "../zodSchema/envValidator"

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_HOST } = env
const { Pool } = pg;

const pgPool = new Pool({
  user: POSTGRES_USER || 'postgres',
  database: POSTGRES_DATABASE || 'lms',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || 'postgres',
  host: POSTGRES_HOST || ""
});

export default pgPool;

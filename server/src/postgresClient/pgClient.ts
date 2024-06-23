import pg from 'pg';
import env from "../zodSchema/envValidator"

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_DATABASE, POSTGRES_PASSWORD } = env
const { Pool } = pg;

const pgPool = new Pool({
  user: POSTGRES_USER || 'postgres',
  database: POSTGRES_DATABASE || 'lms',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || 'postgres',
});

export default pgPool;

import pg from 'pg';

const { Pool } = pg;

const pgPool = new Pool({
  user: 'postgres',
  database: 'lms',
  port: 5432,
  password: 'postgres',
});

export default pgPool;

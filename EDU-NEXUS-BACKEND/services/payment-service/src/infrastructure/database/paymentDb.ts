import { Pool, PoolConfig } from 'pg';

const dbConfig: PoolConfig = {
  user: 'psql',
  host: 'localhost',
  database: '',
  password: process.env.POSTGRESS_DB_PASSWORD,
  port: 5432,
};

const pool = new Pool(dbConfig);

export default pool;

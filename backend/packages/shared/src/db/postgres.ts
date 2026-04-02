import { Pool, PoolClient } from 'pg';

let pool: Pool | null = null;

export const initPostgres = (config: {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}): Pool => {
  if (!pool) {
    pool = new Pool(config);
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
};

export const getPostgres = (): Pool => {
  if (!pool) {
    throw new Error('PostgreSQL pool not initialized. Call initPostgres first.');
  }
  return pool;
};

export const closePostgres = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

export default pool;

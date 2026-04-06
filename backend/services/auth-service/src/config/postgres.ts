import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = new Pool({
  connectionString,
});

export const testDatabaseConnection = async (): Promise<void> => {
  const result = await pool.query<{ now: Date }>('SELECT NOW() AS now');
  console.log('PostgreSQL connection successful at:', result.rows[0].now);
};
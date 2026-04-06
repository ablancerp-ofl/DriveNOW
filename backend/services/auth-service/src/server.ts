import 'dotenv/config';
import app from './app';
import { testDatabaseConnection } from './config/postgres';
import { testRedisConnection } from './config/redis';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
  
  void testDatabaseConnection().catch((error: unknown) => {
    console.error('PostgreSQL connection test failed:', error);
  });

  void testRedisConnection().catch((error: unknown) => {
    console.error('Redis connection test failed:', error);
  });
});
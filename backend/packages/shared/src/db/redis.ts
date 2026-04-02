import Redis from 'ioredis';

let redis: Redis | null = null;

export const initRedis = (config?: {
  host?: string;
  port?: number;
  password?: string;
}): Redis => {
  if (!redis) {
    redis = new Redis({
      host: config?.host || 'localhost',
      port: config?.port || 6379,
      password: config?.password,
      lazyConnect: false,
    });

    redis.on('error', (err) => {
      console.error('Redis client error', err);
    });
  }
  return redis;
};

export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error('Redis client not initialized. Call initRedis first.');
  }
  return redis;
};

export const closeRedis = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
  }
};

export default redis;

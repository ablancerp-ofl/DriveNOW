import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL is not set');
}

export const redis = new Redis(redisUrl);

// Event listeners
redis.on('connect', () => {
  console.log('Redis connected ✅');
});

redis.on('error', (error: Error) => {
  console.error('Redis error:', error);
});

export const testRedisConnection = async (): Promise<void> => {
  try {
    await redis.set('ping', 'pong');
    const value = await redis.get('ping');
    console.log('Redis test:', value);
  } catch (error) {
    console.error('Redis test failed:', error);
  }
};

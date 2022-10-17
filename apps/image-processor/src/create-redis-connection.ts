import { createClient } from 'redis';
import { RedisClient } from '../global';
import { getConfig } from './config';

export async function createRedisConnection(): Promise<RedisClient> {
  const config = await getConfig();

  console.log({ REDIS_URL: config.redisUrl });

  const client = createClient({
    url: config.redisUrl,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  return client;
}

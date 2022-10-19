import { EventEmitter } from 'events';
import { createRedisConnection } from './create-redis-connection';
import { RedisClient } from '../global';

const REDIS_QUEUE_ID = 'images-queue';
const MESSAGE_IN_EVENT = 'message-in';
const MESSAGE_OUT_EVENT = 'message-out';
const POLLING_EVENT = 'polling';

const REDIS_PUB_SUB_ID = 'finished';

const eventEmitter = new EventEmitter();

async function messageIn({ message }: { message: string }): Promise<void> {
  const parsedMessage = JSON.parse(message);

  console.log(`[${new Date().toISOString()}] Take message:\n${parsedMessage}`);

  // process image
  await new Promise((res) => setTimeout(res, 5000));

  eventEmitter.emit(MESSAGE_OUT_EVENT, { message });
}

async function messageOut(redis: RedisClient, { message }: { message: string }): Promise<void> {
  eventEmitter.emit(POLLING_EVENT);

  console.log(`[${new Date().toISOString()}] Send message about completion`);
  redis.publish(REDIS_PUB_SUB_ID, message);
}

async function hasMessage(redis: RedisClient): Promise<boolean> {
  const queueLength = await redis.lLen(REDIS_QUEUE_ID);
  return queueLength > 0;
}

async function startPolling(redis: RedisClient): Promise<void> {
  console.log(`[${new Date().toISOString()}] Wait for new massages...`);

  const intervalId = setInterval(async () => {
    if (await hasMessage(redis)) {
      clearInterval(intervalId);
      const nextMessage = await redis.lPop(REDIS_QUEUE_ID);
      if (!nextMessage) return;
      return eventEmitter.emit(MESSAGE_IN_EVENT, { message: nextMessage });
    }
  }, 1000);
}

async function main() {
  const redis = await createRedisConnection();

  eventEmitter.on(MESSAGE_IN_EVENT, messageIn);
  eventEmitter.on(MESSAGE_OUT_EVENT, (event) => messageOut(redis, event));
  eventEmitter.on(POLLING_EVENT, startPolling.bind(undefined, redis));

  eventEmitter.emit(POLLING_EVENT);
}

(async () => {
  await main();
})();

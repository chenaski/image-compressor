import { compress } from 'compressor';
import { EventEmitter } from 'events';
import path from 'path';

import { RedisClient } from '../global';

import { getConfig } from './config';
import { createRedisConnection } from './create-redis-connection';
import { parseMessage } from './parse-message';

const REDIS_QUEUE_ID = 'images-queue';
const REDIS_PUB_SUB_ID = 'finished';

const HANDLE_MESSAGE = 'message-in';
const START_POLLING = 'polling';

const eventEmitter = new EventEmitter();

async function messageIn(redis: RedisClient, { message }: { message: string }): Promise<void> {
  const config = await getConfig();
  const result = parseMessage(message);

  if (!result.success) {
    // TODO: send error back to the client
    console.log(`[${new Date().toISOString()}] Invalid message:\n${result.error}`);
    eventEmitter.emit(START_POLLING);
    return;
  }

  const parsedMessage = result.data;

  console.log(`[${new Date().toISOString()}] Process message:\n`, parsedMessage);

  for (const { userId, fileName } of parsedMessage) {
    const srcFilePath = path.resolve(config.sourceImagesDirPath, userId, fileName);
    const destDirPath = path.resolve(config.processedImagesDirPath, userId);

    try {
      const result = await compress({ src: srcFilePath, dest: destDirPath });
      await new Promise((res) => setTimeout(res, 3000));
      const processedImageData = [{ userId, fileName: path.basename(result.path) }];
      console.log(`[${new Date().toISOString()}] Send message about completion\n`, processedImageData);
      redis.publish(REDIS_PUB_SUB_ID, JSON.stringify(processedImageData));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      console.log(`[${new Date().toISOString()}] Error while processing:`, errorMessage);
    }
  }

  eventEmitter.emit(START_POLLING);
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
      return eventEmitter.emit(HANDLE_MESSAGE, { message: nextMessage });
    }
  }, 1000);
}

async function main() {
  const redis = await createRedisConnection();

  eventEmitter.on(HANDLE_MESSAGE, (event) => messageIn(redis, event));
  eventEmitter.on(START_POLLING, startPolling.bind(undefined, redis));

  eventEmitter.emit(START_POLLING);
}

(async () => {
  await main();
})();

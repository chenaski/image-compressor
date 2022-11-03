import { compress } from 'compressor';
import { EventEmitter } from 'events';
import path from 'path';

import { RedisClient } from '../global';

import { getConfig } from './config';
import { createRedisConnection } from './create-redis-connection';

interface ImageData {
  userId: string;
  fileName: string;
}
type Message = ImageData[];

const REDIS_QUEUE_ID = 'images-queue';
const REDIS_PUB_SUB_ID = 'finished';

const HANDLE_MESSAGE = 'message-in';
const START_POLLING = 'polling';

const eventEmitter = new EventEmitter();

async function messageIn(redis: RedisClient, { message }: { message: string }): Promise<void> {
  const config = await getConfig();
  const parsedMessage = parseMessage(message);

  if (!parsedMessage) {
    console.log(`[${new Date().toISOString()}] Invalid message:\n${message}`);
    eventEmitter.emit(START_POLLING);
    return;
  }

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

function parseMessage(message: unknown): Message | null {
  if (!message || typeof message !== 'string') return null;

  let parsedData: unknown;

  try {
    parsedData = JSON.parse(message);
  } catch (error) {
    return null;
  }

  const isNonEmptyArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value) && value.length > 0;
  };
  const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof parsedData === 'object';
  };
  const isNonEmptyString = (value: unknown): value is string => {
    return !(!value || typeof value !== 'string');
  };
  const isValidMessage = (value: unknown[]): value is Message => {
    return value.every((item: unknown) => {
      if (!isObject(item)) return false;
      return isNonEmptyString(item.userId) && isNonEmptyString(item.fileName);
    });
  };

  if (!isNonEmptyArray(parsedData) || !isValidMessage(parsedData)) return null;

  return parsedData;
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

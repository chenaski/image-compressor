import { EventEmitter } from 'events';
import fs from 'fs/promises';
import path from 'path';
import { RedisClient } from '../global';
import { createRedisConnection } from './create-redis-connection';
import { getConfig } from './config';

interface ImageData {
  userId: string;
  fileName: string;
}
type Message = ImageData[];

const REDIS_QUEUE_ID = 'images-queue';
const MESSAGE_IN_EVENT = 'message-in';
const MESSAGE_OUT_EVENT = 'message-out';
const POLLING_EVENT = 'polling';

const REDIS_PUB_SUB_ID = 'finished';

const eventEmitter = new EventEmitter();

async function messageIn({ message }: { message: string }): Promise<void> {
  const config = await getConfig();
  const parsedMessage = parseMessage(message);

  if (!parsedMessage) {
    console.log(`[${new Date().toISOString()}] Invalid message:\n${message}`);
    eventEmitter.emit(POLLING_EVENT);
    return;
  }

  console.log(`[${new Date().toISOString()}] Process message:\n${parsedMessage}`);

  const processedImagesData = [];

  // process image
  for (const { userId, fileName } of parsedMessage) {
    const src = path.resolve(config.sourceImagesDirPath, userId, fileName);
    const dest = path.resolve(config.processedImagesDirPath, userId, fileName);

    console.log(`[${new Date().toISOString()}] Save image to ${dest}`);

    await fs.cp(src, dest).catch((error) => {
      console.log(error);
    });

    processedImagesData.push({ userId, fileName });
  }

  await new Promise((res) => setTimeout(res, 5000));

  eventEmitter.emit(MESSAGE_OUT_EVENT, { message: JSON.stringify(processedImagesData) });
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

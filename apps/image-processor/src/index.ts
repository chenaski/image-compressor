import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });

async function main() {
  console.log({ REDIS_URL: process.env.REDIS_URL });
  const client = createClient({
    url: process.env.REDIS_URL || undefined,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  const queueId = 'images-queue';

  const hasMessage = async (): Promise<boolean> => {
    const queueLength = await client.lLen(queueId);
    console.log(new Date(), { queueLength });
    return queueLength > 0;
  };
  const processMessage = async (): Promise<void> => {
    const nextMessage = await client.lPop(queueId);
    console.log(new Date(), { nextMessage });
    if (await hasMessage()) {
      return processMessage();
    } else {
      return startPolling();
    }
  };
  const startPolling = async (): Promise<void> => {
    const intervalId = setInterval(async () => {
      if (await hasMessage()) {
        clearInterval(intervalId);
        return processMessage();
      }
    }, 1000);
  };

  return startPolling();
}

main();

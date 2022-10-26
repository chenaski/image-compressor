import path from 'path';

let isEnvVarsLoaded = false;

const loadEnvVars = async () => {
  if (isEnvVarsLoaded) return;

  isEnvVarsLoaded = true;

  await import('dotenv')
    .then((dotenv) => {
      console.log('Load environment variables from `.env` and `.env.local` files');

      dotenv.config();
      dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });
    })
    .catch(() => {
      console.log('Skip loading dotenv files');
    });
};

export const getConfig = async () => {
  await loadEnvVars();

  const env = process.env;

  return {
    redisUrl: env['REDIS_URL'],
    sourceImagesDirPath: path.resolve(env['SOURCE_IMAGES_PATH'] || ''),
    processedImagesDirPath: path.resolve(env['PROCESSED_IMAGES_PATH'] || ''),
  };
};

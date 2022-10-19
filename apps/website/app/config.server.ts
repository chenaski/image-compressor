const isServer = typeof document === 'undefined';

if (!isServer) throw new Error('Server config have to be used only on the server side.');

const env = process.env;

const apiHost = env['API_HOST'] || 'localhost';
const apiPort = env['API_PORT'] || '4000';

export const configServer = {
  isProd: env['NODE_ENV'] === 'production',
  sessionCookieSecret: env['SESSION_COOKIE_SECRET'] || '',
  sourceImagesDirPath: env['SOURCE_IMAGES_PATH'] || '',
  apiBaseUrl: `http://${apiHost}:${apiPort}`,
  apiPort,
};

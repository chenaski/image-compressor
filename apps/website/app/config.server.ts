import * as os from 'os';

const isServer = typeof document === 'undefined';

if (!isServer) throw new Error('Server config have to be used only on the server side.');

const env = process.env;

export const configServer = {
  sessionCookieSecret: env['SESSION_COOKIE_SECRET'] || '',
  sourceImagesDirPath: env['SOURCE_IMAGES_PATH'] || '',
  apiHost: env['API_HOST'] || 'localhost',
  apiPort: env['API_PORT'] || '4000',
};

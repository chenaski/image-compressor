import * as os from 'os';

const isServer = typeof document === 'undefined';

if (!isServer) throw new Error('Server config have to be used only on the server side.');

const env = process.env;

export const configServer = {
  sessionCookieSecret: env['SESSION_COOKIE_SECRET'] || '',
  sourceImagesDirPath: env['SOURCE_IMAGES_DIR_PATH'] || os.tmpdir(),
  processedImagesDirPath: env['PROCESSED_IMAGES_DIR_PATH'] || os.tmpdir(),
};

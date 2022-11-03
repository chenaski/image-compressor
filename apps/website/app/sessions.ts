import { createCookieSessionStorage } from '@remix-run/node';

import { configServer } from '~/config.server';

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    secrets: [configServer.sessionCookieSecret],
    secure: true,
  },
});

export const SESSION_USER_ID = 'userId';
export { commitSession, destroySession, getSession };

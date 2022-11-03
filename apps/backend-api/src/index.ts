import cookie from '@fastify/cookie';
import redis from '@fastify/redis';
import fastifyStatic from '@fastify/static';
import websocket from '@fastify/websocket';
import fastify from 'fastify';

import { getConfig } from './config';
import { compressRoutes } from './routes/compress';
import { imageRoutes } from './routes/image';
import { pingRoutes } from './routes/ping';
import { wsRoutes } from './routes/ws';

async function startServer() {
  const server = fastify();
  const config = await getConfig();

  server.register(cookie, {
    secret: [config.sessionCookieSecret],
    hook: 'onRequest',
  });
  server.register(websocket);
  server
    .register(redis, {
      url: config.redisUrl,
      namespace: 'common',
    })
    .register(redis, {
      url: config.redisUrl,
      namespace: 'broadcast',
    });
  server.register(fastifyStatic, {
    root: process.cwd(),
  });

  server.register(pingRoutes);
  server.register(compressRoutes);
  server.register(wsRoutes);
  server.register(imageRoutes);

  server.listen({ port: config.port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

(async () => {
  await startServer();
})();

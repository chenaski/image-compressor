import fastify from 'fastify';
import websocket from '@fastify/websocket';
import redis from '@fastify/redis';

import { compressRoutes } from './routes/compress';
import { pingRoutes } from './routes/ping';
import { wsRoutes } from './routes/ws';
import { getConfig } from './config';

async function startServer() {
  const server = fastify();
  const config = await getConfig();

  server.register(websocket);
  server.register(redis, {
    url: process.env.REDIS_URL || undefined,
  });

  server.register(pingRoutes);
  server.register(compressRoutes);
  server.register(wsRoutes);

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

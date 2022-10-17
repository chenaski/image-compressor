import fastify from 'fastify';
import websocket from '@fastify/websocket';
import redis from '@fastify/redis';
import dotenv from 'dotenv';
import path from 'path';

import { compressRoutes } from './routes/compress';
import { pingRoutes } from './routes/ping';
import { wsRoutes } from './routes/ws';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });

const server = fastify();

server.register(websocket);
server.register(redis, {
  url: process.env.REDIS_URL || undefined,
});

server.register(pingRoutes);
server.register(compressRoutes);
server.register(wsRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
server.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

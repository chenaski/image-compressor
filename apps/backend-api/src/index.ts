import fastify from 'fastify';
import websocket from '@fastify/websocket';
import redis from '@fastify/redis';
import dotenv from 'dotenv';
import path from 'path';
import { compressRoutes } from './routes/compress';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });

const server = fastify();

server.register(websocket);
server.register(redis, {
  url: process.env.REDIS_URL || undefined,
});
server.register(compressRoutes);

server.get('/ping', async () => {
  return 'pong\n';
});

server.register(async function (server) {
  server.get('/ws', { websocket: true }, (connection, req) => {
    console.log(`[WS] Client(${req.ip}) connected `);

    connection.socket.send('Hello from backend-api');

    connection.socket.on('close', () => {
      console.log(`[WS] Client(${req.ip}) disconnected`);
    });
    connection.socket.on('message', (message) => {
      console.log(`[WS] Client(${req.ip}) sent message:\n${message}`);

      setTimeout(() => connection.socket.send('Your message was handled'), 5000);
    });
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
server.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

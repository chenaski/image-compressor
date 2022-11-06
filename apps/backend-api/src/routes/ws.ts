import { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';

import { Message, parseMessage } from '../utils/parse-message';

const REDIS_PUB_SUB_ID = 'finished';

const isAlive = (socket: WebSocket & { isAlive?: boolean }): boolean => {
  if (socket.isAlive === undefined) return true;
  return socket.isAlive;
};
const setIsAlive = (socket: WebSocket & { isAlive?: boolean }, isAlive: boolean): void => {
  socket.isAlive = isAlive;
};

export async function wsRoutes(server: FastifyInstance) {
  setInterval(() => {
    server.websocketServer.clients.forEach((socket) => {
      if (!isAlive(socket)) return socket.terminate();

      setIsAlive(socket, false);
      socket.ping();
    });
  }, 30000);

  server.redis.broadcast.subscribe(REDIS_PUB_SUB_ID, (err) => {
    if (err) console.error(`[REDIS] Failed to subscribe: ${err.message}`);
  });
  server.redis.broadcast.on('message', (_, message) => {
    const result = parseMessage(message);

    if (!result.success) {
      // TODO: send error message to the client
      console.log(`[REDIS] Invalid message:\n${message}`);
      return;
    }

    console.log(`[REDIS] Message:\n${message}`);

    const parsedMessage = result.data;

    server.websocketServer.clients.forEach((socket) => {
      // TODO: send to only one user
      const clientMessage: Pick<Message[0], 'fileName'>[] = parsedMessage.map(({ fileName }) => ({ fileName }));
      socket.send(JSON.stringify(clientMessage));
    });
  });

  server.register(async function (server) {
    server.get('/ws', { websocket: true }, (connection, req) => {
      console.log(`[WS] Client(${req.ip}) connected`);

      setIsAlive(connection.socket, true);
      connection.socket.ping();

      connection.socket.on('pong', () => {
        setIsAlive(connection.socket, true);
      });

      connection.socket.on('close', () => {
        console.log(`[WS] Client(${req.ip}) disconnected`);
      });
    });
  });
}

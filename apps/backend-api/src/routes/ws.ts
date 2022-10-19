import { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';

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
      if (isAlive(socket)) return socket.terminate();

      setIsAlive(socket, false);
      socket.ping();
    });
  }, 30000);

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

      connection.socket.on('message', (message) => {
        console.log(`[WS] Client(${req.ip}) sent message:\n${message}`);

        setTimeout(() => connection.socket.send('Your message was handled'), 5000);
      });
    });
  });
}

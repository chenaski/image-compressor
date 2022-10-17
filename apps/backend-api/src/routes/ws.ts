import { FastifyInstance } from 'fastify';

export async function wsRoutes(server: FastifyInstance) {
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
}

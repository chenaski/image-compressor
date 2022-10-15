import fastify from 'fastify';
import { compress } from 'compressor';
import websocket from '@fastify/websocket';

const server = fastify();

server.register(websocket);

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

server.post('/compress', async (request, reply) => {
  reply.headers({ 'Access-Control-Allow-Origin': '*' });
  console.log(`${request.ip} -> /compress`);
  return compress(request.body);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
server.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

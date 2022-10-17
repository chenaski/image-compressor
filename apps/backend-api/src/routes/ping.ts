import { FastifyInstance } from 'fastify';

export async function pingRoutes(server: FastifyInstance) {
  server.get('/ping', async () => {
    return 'pong\n';
  });
}

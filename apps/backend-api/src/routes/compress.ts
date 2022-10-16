import { compress } from 'compressor';
import { FastifyInstance } from 'fastify';

const REDIS_QUEUE_ID = 'images-queue';

export async function compressRoutes(server: FastifyInstance) {
  server.post('/compress', async (request, reply) => {
    reply.headers({ 'Access-Control-Allow-Origin': '*' });

    const body = request.body;
    console.log(`${request.ip} -> /compress\n${body}`);

    await server.redis.rpush(REDIS_QUEUE_ID, JSON.stringify(body));

    return compress(request.body);
  });
}

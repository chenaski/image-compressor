import { FastifyInstance } from 'fastify';
import { getSessionFromRequest } from '../session';

const REDIS_QUEUE_ID = 'images-queue';

export async function compressRoutes(server: FastifyInstance) {
  server.post<{ Body: { fileName: string }[] }>(
    '/compress',
    {
      schema: {
        body: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              fileName: {
                type: 'string',
              },
            },
          },
        },
        response: {
          '200': {
            type: 'object',
            properties: {
              error: {
                type: 'null',
              },
            },
          },
          '401': {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply.headers({ 'Access-Control-Allow-Origin': '*' });

      const body = request.body;
      const session = await getSessionFromRequest(request);

      if (!session) {
        reply.status(401);
        return {
          message: "Session cookie doesn't exist or invalid",
        };
      }

      console.log(`${request.ip} -> /compress\n`, body);

      const message: { userId: string; fileName: string }[] = body.map(({ fileName }) => ({
        userId: session.userId,
        fileName,
      }));

      await server.redis.common.rpush(REDIS_QUEUE_ID, JSON.stringify(message));

      return { error: null };
    }
  );
}

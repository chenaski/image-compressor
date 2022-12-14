import { FastifyInstance } from 'fastify';
import { z as zod } from 'zod';

import { getSessionFromRequest } from '../session';

const REDIS_QUEUE_ID = 'images-queue';

export const BodySchema = zod
  .array(
    zod.object({
      fileName: zod.string().min(1),
      options: zod.object({
        target: zod.enum(['webp', 'avif']),
        quality: zod.number().positive().max(100),
      }),
    })
  )
  .min(1);
export type Body = zod.infer<typeof BodySchema>;

export async function compressRoutes(server: FastifyInstance) {
  server.post<{ Body: Body }>(
    '/compress',
    {
      schema: {
        body: BodySchema,
        response: {
          '200': zod.object({
            error: zod.null(),
          }),
          '401': zod.object({
            message: zod.string().min(1),
          }),
        },
      },
    },
    async (request, reply) => {
      const body = request.body;
      const session = await getSessionFromRequest(request);

      if (!session) {
        reply.status(401);
        return {
          message: "Session cookie doesn't exist or invalid",
        };
      }

      console.log(`${request.ip} -> /compress\n`, body);

      const message: (Body[0] & { userId: string })[] = body.map(({ fileName, options }) => ({
        userId: session.userId,
        fileName,
        options,
      }));

      await server.redis.common.rpush(REDIS_QUEUE_ID, JSON.stringify(message));

      return { error: null };
    }
  );
}

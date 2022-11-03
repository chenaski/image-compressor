import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { FastifySchema } from 'fastify/types/schema';
import path from 'path';

import { getConfig } from '../config';
import { getSessionFromRequest } from '../session';

function createImageRequestHandler({ targetDir }: { targetDir: string }) {
  return async (request: FastifyRequest<{ Params: { image: string } }>, reply: FastifyReply) => {
    reply.headers({ 'Access-Control-Allow-Origin': request.headers.origin });
    reply.headers({ 'Access-Control-Allow-Credentials': true });

    const { image } = request.params;
    const session = await getSessionFromRequest(request);

    if (!session) {
      reply.status(403);
      return { message: "Session cookie doesn't exist or invalid" };
    }

    return reply.sendFile(image, path.resolve(targetDir, session.userId));
  };
}

const schema: FastifySchema = {
  response: {
    '200': {
      type: 'string',
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
};

export async function imageRoutes(server: FastifyInstance) {
  const config = await getConfig();

  server.get('/image/source/:image', { schema }, createImageRequestHandler({ targetDir: config.sourceImagesDirPath }));
  server.get(
    '/image/processed/:image',
    { schema },
    createImageRequestHandler({ targetDir: config.processedImagesDirPath })
  );
}

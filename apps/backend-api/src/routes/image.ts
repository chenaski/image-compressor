import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
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
      return { error: "Session cookie doesn't exist or invalid" };
    }

    return path.resolve(targetDir, session.userId, image);
  };
}

export async function imageRoutes(server: FastifyInstance) {
  const config = await getConfig();

  server.get('/image/source/:image', createImageRequestHandler({ targetDir: config.sourceImagesDirPath }));
  server.get('/image/processed/:image', createImageRequestHandler({ targetDir: config.processedImagesDirPath }));
}

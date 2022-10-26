import { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';

interface ImageData {
  userId: string;
  fileName: string;
}
type Message = ImageData[];

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
      if (isAlive(socket)) return socket.terminate();

      setIsAlive(socket, false);
      socket.ping();
    });
  }, 30000);

  server.redis.broadcast.subscribe(REDIS_PUB_SUB_ID, (err) => {
    if (err) console.error(`[REDIS] Failed to subscribe: ${err.message}`);
  });
  server.redis.broadcast.on('message', (_, message) => {
    const parsedMessage = parseMessage(message);

    if (!parsedMessage) {
      console.log(`[REDIS] Invalid message:\n${message}`);
      return;
    }

    console.log(`[REDIS] Message:\n${message}`);

    server.websocketServer.clients.forEach((socket) => {
      // TODO: send to only one user
      const clientMessage: Pick<ImageData, 'fileName'>[] = parsedMessage.map(({ fileName }) => ({ fileName }));
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

function parseMessage(message: unknown): Message | null {
  if (!message || typeof message !== 'string') return null;

  let parsedData: unknown;

  try {
    parsedData = JSON.parse(message);
  } catch (error) {
    return null;
  }

  const isNonEmptyArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value) && value.length > 0;
  };
  const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof parsedData === 'object';
  };
  const isNonEmptyString = (value: unknown): value is string => {
    return !(!value || typeof value !== 'string');
  };
  const isValidMessage = (value: unknown[]): value is Message => {
    return value.every((item: unknown) => {
      if (!isObject(item)) return false;
      return isNonEmptyString(item.userId) && isNonEmptyString(item.fileName);
    });
  };

  if (!isNonEmptyArray(parsedData) || !isValidMessage(parsedData)) return null;

  return parsedData;
}

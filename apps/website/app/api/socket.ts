import { configClient } from '~/config.client';
import { useImages } from '~/stores/images';

interface ImageData {
  fileName: string;
}
type Message = ImageData[];

let ws: WebSocket | null = null;

export async function connect({ isReconnect }: { isReconnect?: boolean } = { isReconnect: false }): Promise<void> {
  const url = `${configClient.apiWsBaseUrl}/ws`;

  if (!isReconnect && ws) return;

  ws = new WebSocket(url);

  ws.addEventListener('open', () => console.log(`[WS] Connected ${url}`));
  ws.addEventListener('close', () => {
    console.log(`[WS] Closed ${url}`);
    connect({ isReconnect: true });
  });
  ws.addEventListener('error', (event) => console.log(`[WS] Error ${url}`));
  ws.addEventListener('message', (event) => {
    const parsedData = parseMessage(event.data);

    if (!parsedData) return;

    useImages.getState().setProcessedImages(parsedData);
  });
}

export async function send(type: string, data: Record<string, unknown> | unknown[]): Promise<void> {
  if (!ws) {
    throw new Error("WebSocket wasn't initialized yet.");
  }

  ws.send(JSON.stringify(data));
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
      return isNonEmptyString(item.fileName);
    });
  };

  if (!isNonEmptyArray(parsedData) || !isValidMessage(parsedData)) return null;

  return parsedData;
}

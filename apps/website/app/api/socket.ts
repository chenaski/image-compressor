import { configClient } from '~/config.client';
import { useImages } from '~/stores/images';
import { parseMessage } from '~/utils/parse-message';

let ws: WebSocket | null = null;

export async function connect({ isReconnect }: { isReconnect?: boolean } = { isReconnect: false }): Promise<void> {
  const url = `${configClient.apiWsBaseUrl}/ws`;

  if (!isReconnect && ws) return;

  ws = new WebSocket(url);

  ws.addEventListener('open', () => console.log(`[WS] Connected ${url}`));
  ws.addEventListener('close', () => {
    console.log(`[WS] Closed ${url}`);
    // TODO: limit retries
    connect({ isReconnect: true });
  });
  ws.addEventListener('error', (event) => console.log(`[WS] Error ${url}`));
  ws.addEventListener('message', (event) => {
    const result = parseMessage(event.data);

    // TODO: handle error
    if (!result.success) return;

    useImages.getState().setProcessedImages(result.data);
  });
}

export async function send(type: string, data: Record<string, unknown> | unknown[]): Promise<void> {
  if (!ws) {
    throw new Error("WebSocket wasn't initialized yet.");
  }

  ws.send(JSON.stringify(data));
}

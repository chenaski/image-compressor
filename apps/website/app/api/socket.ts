import { configClient } from '~/config.client';

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
  ws.addEventListener('message', (event) => console.log(`[WS] Message received:\n${event.data}`));
}

export async function send(type: string, data: Record<string, unknown> | unknown[]): Promise<void> {
  if (!ws) {
    throw new Error("WebSocket wasn't initialized yet.");
  }

  ws.send(JSON.stringify(data));
}

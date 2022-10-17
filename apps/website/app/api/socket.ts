import { configClient } from '~/config.client';

const BASE_URL = `ws://${configClient.apiHost}:${configClient.apiPort}`;
let ws: WebSocket | null = null;

export async function connect(): Promise<void> {
  const url = `${BASE_URL}/ws`;

  if (ws) return;

  ws = new WebSocket(url);

  ws.addEventListener('open', () => console.log(`[WS] Connected ${url}`));
  ws.addEventListener('close', () => console.log(`[WS] Closed ${url}`));
  ws.addEventListener('error', (event) => console.log(`[WS] Error ${url}`));
  ws.addEventListener('message', (event) => console.log(`[WS] Message received:\n${event.data}`));
}

export async function send(type: string, data: Record<string, unknown> | unknown[]): Promise<void> {
  if (!ws) {
    throw new Error("WebSocket wasn't initialized yet.");
  }

  ws.send(JSON.stringify(data));
}

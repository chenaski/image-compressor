import type { configServer } from '~/config.server';

const isClient = typeof document !== 'undefined';

if (!isClient) throw new Error('Client config have to be used only on the client side.');

declare global {
  interface Window {
    ENV: Record<string, string | undefined>;
  }
}

const env = window.ENV as typeof configServer;

export const configClient = {
  apiHost: window.location.hostname,
  apiPort: env.apiPort,
};

const isClient = typeof document !== 'undefined';

if (!isClient) throw new Error('Client config have to be used only on the client side.');

export type ExpectedVars = {
  isProd: boolean;
  apiPort: string;
};

declare global {
  interface Window {
    ENV: ExpectedVars;
  }
}

const env = window.ENV;
const isProd = env.isProd;
const host = window.location.hostname;

const apiBaseUrlDev = `${host}:${env.apiPort}`;
const apiBaseUrlProd = `${host}/api`;

const apiHttpBaseUrl = isProd ? `https://${apiBaseUrlProd}` : `http://${apiBaseUrlDev}`;
const apiWsBaseUrl = isProd ? `wss://${apiBaseUrlProd}` : `ws://${apiBaseUrlDev}`;

export const configClient = {
  apiHttpBaseUrl,
  apiWsBaseUrl,
};

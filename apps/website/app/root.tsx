import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import styles from './tailwind.css';
import type { ExpectedVars } from '~/config.client';
import { configServer } from '~/config.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Image Compressor',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader() {
  const env: ExpectedVars = {
    isProd: configServer.isProd,
    apiPort: configServer.apiPort,
  };
  return {
    ENV: env,
  };
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

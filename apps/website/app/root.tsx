import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import tailwindCss from './styles/tailwind.css';
import globalCss from './styles/global.css';
import type { ExpectedVars } from '~/config.client';
import { configServer } from '~/config.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Image Compressor',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCss },
  { rel: 'stylesheet', href: globalCss },
];

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

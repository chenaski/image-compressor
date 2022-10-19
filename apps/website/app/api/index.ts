import { configServer } from '~/config.server';

export async function send(path: string, data: Record<string, unknown> | unknown[]) {
  const url = `${configServer.apiBaseUrl}${path}`;

  console.log(`Send images data to ${url}`);

  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  }).catch(console.log);
}

export async function sendNewImagesInfo(info: { path: string }[]) {
  return send('/compress', info);
}

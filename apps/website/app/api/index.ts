import { configServer } from '~/config.server';

export async function send(
  path: string,
  data: Record<string, unknown> | unknown[],
  { cookie }: { cookie: string | null }
) {
  const url = `${configServer.apiBaseUrl}${path}`;

  console.log(`Send images data to ${url}`);

  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Credentials: 'includes',
      ...(cookie ? { Cookie: cookie } : {}),
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        if (typeof data?.message === 'string') {
          return { data: null, error: data.message };
        }
        return { data: null, error: 'Unexpected error' };
      }

      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error: error.message };
    });
}

export async function sendNewImagesInfo(
  info: { fileName: string }[],
  { cookie }: { cookie: string | null }
): Promise<{ data: { fileName: string }[] | null; error: string | null }> {
  return send('/compress', info, { cookie });
}

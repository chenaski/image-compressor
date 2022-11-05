import { configClient } from '~/config.client';
import { useImages } from '~/stores/images';
import { useOptions } from '~/stores/options';

export async function send(
  path: string,
  data: Record<string, unknown> | unknown[],
  { cookie }: { cookie?: string | null } = {}
) {
  const url = `${configClient.apiHttpBaseUrl}${path}`;

  console.log(`Send images data to ${url}`);

  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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

export async function sendNewImagesInfo({ cookie }: { cookie?: string | null } = {}): Promise<{
  data: { fileName: string }[] | null;
  error: string | null;
}> {
  const { images } = useImages.getState();
  const { target, quality } = useOptions.getState();

  const data = Object.values(images).map(({ source }) => ({
    fileName: source.fileName,
    options: { target, quality },
  }));

  return send('/compress', data, { cookie });
}

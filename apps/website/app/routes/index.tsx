import type { ActionArgs } from '@remix-run/node';
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';
import path from 'path';
import type { ChangeEvent } from 'react';

import { UploadScreen } from '~/components/upload-screen';
import { UploadedScreen } from '~/components/uploaded-screen';
import { configServer } from '~/config.server';
import { getSession, SESSION_USER_ID } from '~/sessions';
import { useImages } from '~/stores/images';

type ActionData = { error: string | null };

export const action = async ({ request }: ActionArgs): Promise<ActionData> => {
  const cookie = request.headers.get('Cookie');
  const session = await getSession(cookie);
  const sourceImagesDir = path.resolve(configServer.sourceImagesDirPath, session.get(SESSION_USER_ID));
  const uploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      maxPartSize: 1024 * 1024 * 5,
      directory: sourceImagesDir,
      file: ({ filename }) => filename,
      avoidFileConflicts: false,
    })
  );
  await parseMultipartFormData(request, uploadHandler);

  return { error: null };
};

export default function Index() {
  const { images, setSourceImages } = useImages();

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files;
    if (!images?.length) return;
    const urls = Array.from(images).map((image) => ({ fileName: image.name, url: URL.createObjectURL(image) }));
    e.target.form?.requestSubmit();
    setSourceImages(urls);
  };

  return Object.keys(images).length === 0 ? <UploadScreen onSelect={onSelectImage} /> : <UploadedScreen />;
}

import type { ActionArgs } from '@remix-run/node';
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';
import path from 'path';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { sendNewImagesInfo } from '~/api';
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
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 1024 * 1024 * 5,
      directory: sourceImagesDir,
      file: ({ filename }) => filename,
      avoidFileConflicts: false,
    })
  );
  await unstable_parseMultipartFormData(request, uploadHandler);

  return { error: null };
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const transition = useTransition();
  const [minLoadingThreshold, setMinLoadingThreshold] = useState(false);
  const isLoading = minLoadingThreshold || transition.state !== 'idle';
  const { images, setSourceImages } = useImages();

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files;
    if (!images?.length) return;
    const urls = Array.from(images).map((image) => ({ fileName: image.name, url: URL.createObjectURL(image) }));
    e.target.form?.requestSubmit();
    setMinLoadingThreshold(true);
    // TODO: remove delay and loading state, because we can do it immediately
    setTimeout(async () => {
      setMinLoadingThreshold(false);
      setSourceImages(urls);
      await sendNewImagesInfo();
    }, 1500);
  };

  return Object.keys(images).length === 0 ? (
    <UploadScreen onSelect={onSelectImage} isLoading={isLoading} error={actionData?.error} />
  ) : (
    <UploadedScreen />
  );
}

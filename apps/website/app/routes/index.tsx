import path from 'path';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { ActionArgs } from '@remix-run/node';
import {
  NodeOnDiskFile,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';
import { getSession, SESSION_USER_ID } from '~/sessions';
import { configServer } from '~/config.server';
import { sendNewImagesInfo } from '~/api';
import { useImages } from '~/stores/images';
import { Uploaded } from '~/components/uploaded';
import { Upload } from '~/components/upload';

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
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const images = formData.getAll('images');
  const info = images.reduce((info, meta) => {
    if (meta instanceof NodeOnDiskFile) {
      info.push({ fileName: meta.name });
    }

    return info;
  }, [] as Parameters<typeof sendNewImagesInfo>[0]);

  const response = await sendNewImagesInfo(info, { cookie });

  if (response.error) {
    return {
      error: response.error,
    };
  }

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
    setSourceImages(urls);
    e.target.form?.requestSubmit();
    setMinLoadingThreshold(true);
    setTimeout(() => setMinLoadingThreshold(false), 3000);
  };

  return Object.keys(images).length === 0 ? (
    <Upload onSelect={onSelectImage} isLoading={isLoading} error={actionData?.error} />
  ) : (
    <Uploaded />
  );
}

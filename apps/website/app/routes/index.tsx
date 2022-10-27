import path from 'path';
import type { ChangeEvent } from 'react';
import type { ActionArgs } from '@remix-run/node';
import {
  NodeOnDiskFile,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { getSession, SESSION_USER_ID } from '~/sessions';
import { configServer } from '~/config.server';
import { sendNewImagesInfo } from '~/api';
import { useImages } from '~/stores/images';

import { Spinner } from '~/components/spinner';
import { Icon } from '~/components/icon';
import { useState } from 'react';

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

  return (
    <div className={'flex flex-col items-center justify-center h-screen'}>
      <div className={'relative'}>
        <Icon hideParts={isLoading} />
        {isLoading && (
          <Spinner className={'w-[50px] h-[50px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'} />
        )}
      </div>

      <p className={'mt-3'}>Drop or Paste</p>

      <Form method={'post'} encType="multipart/form-data" className={'mt-4'}>
        <label className={'relative'}>
          <input
            className={'opacity-0 absolute inset-0 z-[-1]'}
            aria-label={'Upload your images'}
            name={'images'}
            type={'file'}
            multiple={true}
            itemType={'.jpg,.jpeg,.png,.webp,.avif'}
            onChange={onSelectImage}
          />
          <span
            className={
              'inline-flex items-center justify-center text-center bg-black text-white min-w-[280px] min-h-[60px] text-[18px] cursor-pointer transition hover:bg-gray-800'
            }
          >
            Upload Images
          </span>
        </label>
      </Form>

      {actionData?.error && <div className={'mt-2 text-red-800'}>{actionData.error}</div>}
    </div>
  );
}

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
import { Form, useActionData } from '@remix-run/react';
import { getSession, SESSION_USER_ID } from '~/sessions';
import { configServer } from '~/config.server';
import { sendNewImagesInfo } from '~/api';

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
  const [sourceUrls, setSourceUrls] = useState<string[] | null>(null);

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files;
    if (!images?.length) return;
    const urls = Array.from(images).map(URL.createObjectURL);
    setSourceUrls(urls);
  };

  return (
    <div className={'p-5'}>
      <h1 className={'text-3xl font-bold underline'}>Image Compressor!</h1>
      <Form method={'post'} encType="multipart/form-data" className={'mt-2'}>
        <label>
          <input
            name={'images'}
            type={'file'}
            multiple={true}
            itemType={'.jpg,.jpeg,.png,.webp,.avif'}
            onChange={onSelectImage}
          />
        </label>

        <button
          type={'submit'}
          className={'block mt-2 px-2 py-1 rounded border border-gray-500 bg-gray-100 hover:bg-gray-200'}
        >
          Send images
        </button>

        {actionData?.error && <div className={'mt-1 text-red-800'}>{actionData.error}</div>}

        {sourceUrls && (
          <div className={'mt-2 overflow-x-auto'}>
            <div className={'flex'}>
              {sourceUrls?.length &&
                sourceUrls.map((url) => (
                  <img key={url} className={'max-h-[300px]'} src={url} alt="" width={'auto'} height={300} />
                ))}
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

import path from 'path';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
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

type ActionData = { path: string }[];

export const action = async ({ request }: ActionArgs): Promise<ActionData> => {
  const session = await getSession(request.headers.get('Cookie'));
  const sourceImagesDir = path.join(configServer.sourceImagesDirPath, session.get(SESSION_USER_ID));
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 1024 * 1024 * 5,
      directory: sourceImagesDir,
      file: ({ filename }) => filename,
    })
  );
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const images = formData.getAll('images');
  const response = images.reduce((response, meta) => {
    if (meta instanceof NodeOnDiskFile) {
      response.push({
        path: path.join(sourceImagesDir, meta.name),
      });
    }

    return response;
  }, [] as ActionData);

  await sendNewImagesInfo(response);

  return response;
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [sourceUrls, setSourceUrls] = useState<string[] | null>(null);
  const [serverUrls, setServerUrls] = useState<string[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files;
    if (!images?.length) return;
    const urls = Array.from(images).map(URL.createObjectURL);
    setSourceUrls(urls);
  };

  useEffect(() => {
    if (!actionData?.length) return;
    const urls = actionData.map((meta) => `${location.origin}/${meta.path}`);
    setServerUrls(urls);
  }, [actionData]);

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
            ref={ref}
          />
        </label>

        <button
          type={'submit'}
          className={'block mt-2 px-2 py-1 rounded border border-gray-500 bg-gray-100 hover:bg-gray-200'}
        >
          Send images
        </button>

        {(sourceUrls || serverUrls) && (
          <div className={'mt-2 overflow-x-auto'}>
            {sourceUrls && (
              <div className={'flex'}>
                {sourceUrls?.length &&
                  sourceUrls.map((url) => (
                    <img key={url} className={'max-h-[300px]'} src={url} alt="" width={'auto'} height={300} />
                  ))}
              </div>
            )}

            {serverUrls && (
              <div className={'flex'}>
                {serverUrls?.length &&
                  serverUrls.map((url) => (
                    <img key={url} className={'max-h-[300px]'} src={url} alt="" width={'auto'} height={300} />
                  ))}
              </div>
            )}
          </div>
        )}
      </Form>
    </div>
  );
}

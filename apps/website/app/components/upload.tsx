import type { ChangeEvent } from 'react';
import React from 'react';
import { Form } from '@remix-run/react';
import { Icon } from '~/components/icon';
import { Spinner } from '~/components/spinner';

export const Upload: React.FC<{
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error?: string | null;
}> = ({ onSelect, isLoading, error }) => {
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
            onChange={onSelect}
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

      {error && <div className={'mt-2 text-red-800'}>{error}</div>}
    </div>
  );
};

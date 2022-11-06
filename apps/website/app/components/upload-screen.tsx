import { Form } from '@remix-run/react';
import type { ChangeEvent } from 'react';

import { Button } from '~/components/button';
import { Icon } from '~/components/icons/icon';
import { Spinner } from '~/components/spinner';

export const UploadScreen: React.FC<{
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error?: string | null;
}> = ({ onSelect, isLoading, error }) => {
  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <div className={'relative'}>
        <Icon hideParts={isLoading} />
        {isLoading && (
          <Spinner className={'absolute top-1/2 left-1/2 h-[50px] w-[50px] translate-x-[-50%] translate-y-[-50%]'} />
        )}
      </div>

      <p className={'mt-3'}>Drop or Paste</p>

      <Form method={'post'} encType="multipart/form-data" className={'mt-4'}>
        <label className={'relative'}>
          <input
            className={'absolute inset-0 z-[-1] opacity-0'}
            aria-label={'Upload your images'}
            name={'images'}
            type={'file'}
            multiple={true}
            itemType={'.jpg,.jpeg,.png,.webp,.avif'}
            onChange={onSelect}
          />
          <Button fake={true}>Upload Images</Button>
        </label>
      </Form>

      {error && <div className={'mt-2 text-red-800'}>{error}</div>}
    </div>
  );
};

import { useFetcher } from '@remix-run/react';
import type { ChangeEvent, FC } from 'react';
import { useRef } from 'react';

import { CloudsIcon } from '~/components/icons/clouds-icon';
import { SiteLogoIcon } from '~/components/icons/site-logo-icon';

export const UploadScreen: FC<{
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSelect }) => {
  const fetcher = useFetcher();

  const fileInput = useRef<HTMLInputElement>(null);
  const openFileSelect = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  return (
    <div className={'flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-[#E5F3FF]'}>
      <SiteLogoIcon className={'mb-[40px]'} />

      <div
        className={
          'min-h-[510px] min-w-[540px] rounded-[24px] bg-white p-[12px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_4px_20px_rgba(0,0,0,0.1)]'
        }
      >
        <fetcher.Form
          method={'post'}
          encType="multipart/form-data"
          className={
            'flex h-full cursor-pointer flex-col items-center justify-center rounded-[20px] border border-dashed border-[#E7EAEE] text-center'
          }
          onClick={openFileSelect}
        >
          <CloudsIcon />

          <p className={'line-height-[1.2] max-w-[210px] font-display text-xl font-semibold'}>
            Drop, paste or click to <b className={'text-[#0069DD]'}>browse</b> images
          </p>

          <p className={'mt-[8px] text-sm text-[#A9B4C6]'}>png · jpg -{'>'} webp · avif</p>

          <input
            ref={fileInput}
            className={'absolute inset-0 z-[-1] opacity-0'}
            aria-label={'Upload your images'}
            name={'images'}
            type={'file'}
            multiple={true}
            itemType={'.jpg,.jpeg,.png,.webp,.avif'}
            onChange={onSelect}
          />
        </fetcher.Form>
      </div>
    </div>
  );
};

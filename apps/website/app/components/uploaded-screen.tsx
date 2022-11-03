import React, { useState } from 'react';
import { useImages } from '~/stores/images';
import { CloseIcon } from '~/components/icons/close-icon';
import { Spinner } from '~/components/spinner';
import { Options } from '~/components/options/options';

export const UploadedScreen = () => {
  const { images, clear } = useImages();
  const [selectedImageId, setSelectedImageId] = useState<string>(Object.keys(images)[0]);
  const { source, processed } = images[selectedImageId];

  return (
    <div className={'flex h-screen grow'}>
      <div className={'flex grow flex-col items-center p-[36px]'}>
        <button
          onClick={clear}
          className={
            'absolute top-0 left-0 mt-4 ml-4 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 transition hover:bg-[#c9cdd4]'
          }
        >
          <CloseIcon />
        </button>

        <div
          className={
            'mt-auto mb-auto grid aspect-video w-[80%] max-w-[800px] grid-cols-2 overflow-hidden rounded-md bg-gray-200'
          }
        >
          <img className={'h-full min-h-0 w-full object-contain object-right'} src={source} alt="" />
          <div className={'relative min-h-0'}>
            <img
              className={`h-full w-full object-contain object-left ${processed ? '' : 'blur'}`}
              src={processed || source}
              alt=""
            />
            {!processed && (
              <Spinner
                className={'absolute top-1/2 left-1/2 h-[50px] w-[50px] translate-x-[-50%] translate-y-[-50%]'}
              />
            )}
          </div>
        </div>

        <div className={'mt-4 flex shrink-0 gap-2 overflow-x-auto'}>
          {Object.entries(images).map(([id, { source, processed }]) => {
            return (
              <button
                key={source}
                className={`group relative h-[62px] w-[62px] overflow-hidden rounded border border-gray-200 bg-gray-200 transition hover:border-gray-400 ${
                  id === selectedImageId ? 'border-2 border-black' : ''
                }`}
                onClick={() => {
                  setSelectedImageId(id);
                }}
              >
                <img
                  className={`h-full w-full object-cover transition group-hover:scale-110 group-hover:opacity-100 ${
                    id === selectedImageId ? '' : 'opacity-80'
                  } ${!processed ? 'blur-[1px]' : ''}`}
                  src={source}
                  alt=""
                />
                {!processed && (
                  <Spinner className={'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Options className={'w-[420px]'} />
    </div>
  );
};

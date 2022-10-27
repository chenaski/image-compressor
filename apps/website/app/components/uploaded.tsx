import React, { useState } from 'react';
import { useImages } from '~/stores/images';
import { CloseIcon } from '~/components/close-icon';
import { Spinner } from '~/components/spinner';

export const Uploaded = () => {
  const { images, clear } = useImages();
  const [selectedImageId, setSelectedImageId] = useState<string>(Object.keys(images)[0]);
  const { source, processed } = images[selectedImageId];

  return (
    <div className={'flex flex-col items-center h-screen p-[36px]'}>
      <button
        onClick={clear}
        className={
          'w-[30px] h-[30px] flex items-center justify-center absolute top-0 right-0 rounded-full bg-gray-200 mt-4 mr-4 transition hover:bg-[#c9cdd4] cursor-pointer'
        }
      >
        <CloseIcon />
      </button>

      <div
        className={
          'max-w-[800px] w-[80%] aspect-video bg-gray-200 grid grid-cols-2 mt-auto mb-auto overflow-hidden rounded-md'
        }
      >
        <img className={'w-full h-full object-contain object-right min-h-0'} src={source} alt="" />
        <div className={'relative min-h-0'}>
          <img
            className={`w-full h-full object-contain object-left ${processed ? '' : 'blur'}`}
            src={processed || source}
            alt=""
          />
          {!processed && (
            <Spinner className={'w-[50px] h-[50px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'} />
          )}
        </div>
      </div>

      <div className={'flex overflow-x-auto mt-4 shrink-0 gap-2'}>
        {Object.entries(images).map(([id, { source, processed }]) => {
          return (
            <button
              key={source}
              className={`relative w-[62px] h-[62px] bg-gray-200 rounded overflow-hidden border border-gray-200 transition hover:border-gray-400 group ${
                id === selectedImageId ? 'border-2 border-black' : ''
              }`}
              onClick={() => {
                setSelectedImageId(id);
              }}
            >
              <img
                className={`w-full h-full object-cover group-hover:scale-110 transition group-hover:opacity-100 ${
                  id === selectedImageId ? '' : 'opacity-80'
                } ${!processed ? 'blur-[1px]' : ''}`}
                src={source}
                alt=""
              />
              {!processed && <Spinner className={'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

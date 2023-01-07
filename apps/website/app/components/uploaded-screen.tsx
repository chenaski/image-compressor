import { useState } from 'react';
import usePanZoom from 'use-pan-and-zoom';

import { CloseIcon } from '~/components/icons/close-icon';
import { ImageComparisonSlider } from '~/components/image-comparison-slider/image-comparison-slider';
import { Options } from '~/components/options/options';
import { Spinner } from '~/components/spinner';
import { useDraggable } from '~/hooks/use-draggable';
import { useImages } from '~/stores/images';

export const UploadedScreen = () => {
  const { images, clear } = useImages();
  const [selectedImageId, setSelectedImageId] = useState<string>(Object.keys(images)[0]);
  const { source, processed } = images[selectedImageId];

  const { transform, setContainer, panZoomHandlers } = usePanZoom();
  const { targetRef: sliderHandleRef } = useDraggable<HTMLButtonElement>({
    controlStyle: true,
    axis: 'x',
  });

  return (
    <div
      className={'flex h-screen grow'}
      ref={(node) => {
        setContainer(node);
      }}
      style={{ touchAction: 'none' }}
      {...panZoomHandlers}
    >
      <div className={'flex grow flex-col items-center p-[36px]'}>
        <button
          onClick={clear}
          className={
            'absolute top-0 left-0 mt-4 ml-4 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 transition hover:bg-[#c9cdd4]'
          }
        >
          <CloseIcon />
        </button>

        <ImageComparisonSlider
          leftImageSrc={source.url}
          rightImageSrc={processed || source.url}
          transform={transform}
        />

        <button className={'fixed top-0 left-[50%] bottom-0 cursor-col-resize px-[20px]'} ref={sliderHandleRef}>
          <span className={'block h-full w-[4px] border-x border-white bg-gray-500'}></span>
          <span
            className={
              'absolute top-[50%] left-[50%] h-[20px] w-[20px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-gray-500'
            }
          ></span>
        </button>

        <div className={'mt-4 flex shrink-0 gap-2 overflow-x-auto'}>
          {Object.entries(images).map(([id, { source, processed }]) => {
            return (
              <button
                key={id}
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
                  src={source.url}
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

      <Options className={'relative z-10 w-[420px] shrink-0'} />
    </div>
  );
};

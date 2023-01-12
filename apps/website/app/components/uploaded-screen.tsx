import { useState } from 'react';
import usePanZoom from 'use-pan-and-zoom';

import { CloseIcon } from '~/components/icons/close-icon';
import { DividerWithRef } from '~/components/image-comparison-slider/divider';
import { ImagesContainerWithRef } from '~/components/image-comparison-slider/images-container';
import { Options } from '~/components/options/options';
import { Spinner } from '~/components/spinner';
import { useComparisonSlider } from '~/hooks/use-comparison-slider';
import { useDraggable } from '~/hooks/use-draggable';
import { useImages } from '~/stores/images';

export const UploadedScreen = () => {
  const { images, clear } = useImages();
  const [selectedImageId, setSelectedImageId] = useState<string>(Object.keys(images)[0]);
  const { source, processed } = images[selectedImageId];

  const { transform, setContainer, panZoomHandlers } = usePanZoom();
  const { targetRef } = useDraggable<HTMLButtonElement>({
    controlStyle: true,
    axis: 'x',
  });
  const { intersection, sliderHandleRef, imageRef } = useComparisonSlider();

  return (
    <div className={'flex h-screen grow'}>
      <div
        className={'flex grow touch-none flex-col items-center p-[36px]'}
        ref={(node) => {
          setContainer(node);
        }}
        {...panZoomHandlers}
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            clear();
          }}
          className={
            'absolute top-0 left-0 mt-4 ml-4 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 transition hover:bg-[#c9cdd4]'
          }
        >
          <CloseIcon />
        </button>

        <ImagesContainerWithRef
          leftImageSrc={source.url}
          rightImageSrc={processed || source.url}
          transform={transform}
          intersection={intersection}
          ref={imageRef}
        />

        <DividerWithRef
          ref={(node) => {
            targetRef.current = node;
            sliderHandleRef.current = node;
          }}
        />

        <div className={'mt-4 flex shrink-0 gap-2 overflow-x-auto'}>
          {Object.entries(images).map(([id, { source, processed }]) => {
            return (
              <button
                key={id}
                className={`group relative h-[62px] w-[62px] overflow-hidden rounded border border-gray-200 bg-gray-200 transition hover:border-gray-400 ${
                  id === selectedImageId ? 'border-2 border-black' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
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

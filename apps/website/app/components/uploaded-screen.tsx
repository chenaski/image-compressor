import { useState } from 'react';
import usePanZoom from 'use-pan-and-zoom';

import { AddButton } from '~/components/add-button';
import { CloseButton } from '~/components/close-button';
import { DividerWithRef } from '~/components/image-comparison-slider/divider';
import { ImagesContainerWithRef } from '~/components/image-comparison-slider/images-container';
import { Options } from '~/components/options/options';
import { SelectImagePanel } from '~/components/select-image-panel';
import { useComparisonSlider } from '~/hooks/use-comparison-slider';
import { useDraggable } from '~/hooks/use-draggable';
import { useImages } from '~/stores/images';

export const UploadedScreen = () => {
  const { images, clear } = useImages();
  const [selectedImageId, setSelectedImageId] = useState<string>(Object.keys(images)[0]);
  const { source, processed } = images[selectedImageId];

  const { transform, setContainer, panZoomHandlers } = usePanZoom();
  const { setTarget } = useDraggable<HTMLButtonElement>({
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
        <CloseButton
          className={'absolute top-[20px] left-[20px]'}
          onClick={(event) => {
            event.stopPropagation();
            clear();
          }}
        />

        <AddButton className={'absolute bottom-[20px] left-[20px]'} onClick={() => {}} />

        <ImagesContainerWithRef
          leftImageSrc={source.url}
          rightImageSrc={processed || source.url}
          transform={transform}
          intersection={intersection}
          ref={imageRef}
        />

        <DividerWithRef
          ref={(node) => {
            setTarget(node);
            sliderHandleRef.current = node;
          }}
        />

        <SelectImagePanel images={images} selectedImageId={selectedImageId} setSelectedImageId={setSelectedImageId} />
      </div>

      <Options className={'relative z-10 w-[420px] shrink-0'} />
    </div>
  );
};

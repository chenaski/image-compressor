import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

export const ImageComparisonSlider = (
  {
    leftImageSrc,
    rightImageSrc,
    intersection,
    transform,
  }: {
    leftImageSrc: string;
    rightImageSrc: string;
    intersection: number;
    transform: string;
  },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const rightImageStyles: React.CSSProperties = {
    clipPath: `polygon(${intersection * 100}% 0, 100% 0, 100% 100%, ${intersection * 100}% 100%)`,
  };

  return (
    <div className={'pointer-events-none relative min-h-0 grow select-none'} style={{ transform }} ref={ref}>
      <img className={'h-full max-h-full'} src={rightImageSrc} alt="Before optimisation" />
      <img
        className={'absolute top-0 left-0 h-full'}
        src={leftImageSrc}
        alt="After optimisation"
        style={rightImageStyles}
      />
    </div>
  );
};

export const ImageComparisonSliderWithRef = forwardRef(ImageComparisonSlider);

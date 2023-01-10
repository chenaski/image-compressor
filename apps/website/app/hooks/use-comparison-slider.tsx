import { useLayoutEffect, useRef, useState } from 'react';

export const useComparisonSlider = <T1 extends HTMLElement, T2 extends HTMLDivElement>() => {
  const [intersection, setIntersection] = useState(0);
  const sliderHandleRef = useRef<T1 | null>(null);
  const imageRef = useRef<T2 | null>(null);

  const sliderHandleRect = sliderHandleRef?.current?.getBoundingClientRect();
  const imageRect = imageRef?.current?.getBoundingClientRect();

  useLayoutEffect(() => {
    if (!sliderHandleRect || !imageRect) return;

    const sliderLeft = sliderHandleRect.left + sliderHandleRect.width / 2;
    const sliderRight = sliderHandleRect.right - sliderHandleRect.width / 2;
    const { left: imageLeft, right: imageRight } = imageRect;

    if (sliderLeft < imageLeft) {
      if (intersection !== 0) setIntersection(0);
      return;
    } else if (sliderRight > imageRight) {
      if (intersection !== 100) setIntersection(1);
      return;
    }

    const diff = sliderLeft - imageLeft;

    setIntersection(diff / imageRect.width);
  }, [imageRect, intersection, sliderHandleRect]);

  return {
    intersection,
    sliderHandleRef,
    imageRef,
  };
};

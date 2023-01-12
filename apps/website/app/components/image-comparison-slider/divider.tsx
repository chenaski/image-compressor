import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

export const Divider = (props: unknown, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button className={'fixed top-0 left-[50%] bottom-0 cursor-col-resize px-[20px]'} ref={ref}>
      <span className={'block h-full w-[4px] border-x border-white bg-gray-500'}></span>
      <span
        className={
          'absolute top-[50%] left-[50%] h-[20px] w-[20px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-gray-500'
        }
      ></span>
    </button>
  );
};

export const DividerWithRef = forwardRef(Divider);

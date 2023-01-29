import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { ArrowsIcon } from '~/components/icons/arrows-icon';

export const Divider = (props: unknown, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button className={'fixed top-0 left-[50%] bottom-0 cursor-col-resize px-[20px]'} ref={ref}>
      <span className={'block h-full w-[3px] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.42)]'}></span>
      <span
        className={
          'absolute top-[50%] left-[50%] flex h-[53px] w-[53px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-white shadow-button'
        }
      >
        <ArrowsIcon />
      </span>
    </button>
  );
};

export const DividerWithRef = forwardRef(Divider);

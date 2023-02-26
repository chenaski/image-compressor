import cn from 'classnames';
import type { FC, HTMLProps } from 'react';

export const OptionsInput: FC<HTMLProps<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'h-[28px] w-[38px] appearance-none rounded-lg border border-[#ddd] bg-transparent px-[8px] py-[6px] text-right text-xs text-[#333] transition focus:border-[#0085FF] focus:shadow-[0_0_0_1px_#0085FF] focus:outline-0',
        className
      )}
      {...props}
    />
  );
};

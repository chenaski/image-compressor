import cn from 'classnames';
import type { FC, HTMLProps } from 'react';

export const OptionsRange: FC<
  Omit<HTMLProps<HTMLInputElement>, 'value' | 'min' | 'max'> & { value: number; min?: number; max?: number }
> = ({ value, className, min = 0, max = 100, ...props }) => {
  const percent = (value / max) * 100;

  return (
    <input
      type="range"
      className={cn('range', className)}
      style={{
        '--range-fill-percent': `${percent}%`,
      }}
      value={value}
      min={min}
      max={max}
      {...props}
    />
  );
};

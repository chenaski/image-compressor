import cn from 'classnames';
import type { FC, HTMLProps } from 'react';

export const OptionsRange: FC<Omit<HTMLProps<HTMLInputElement>, 'value'> & { value: number }> = ({
  value,
  className,
  ...props
}) => {
  return (
    <input
      type="range"
      className={cn('range', className)}
      style={{
        '--range-fill-percent': `${value}%`,
      }}
      {...props}
    />
  );
};

import cn from 'classnames';
import type { FC } from 'react';

export interface OptionsSwitcherProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export const OptionsSwitcher: FC<OptionsSwitcherProps> = ({ className, value, onChange }) => {
  return (
    <div
      className={cn(
        "relative h-[20px] w-[34px] rounded-[100px] bg-[#eee] before:absolute before:left-[2px] before:top-[2px] before:block before:h-[16px] before:w-[16px] before:rounded-full before:bg-white before:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_1px_1px_rgba(0,0,0,0.1)] before:transition before:content-['']",
        { 'before:translate-x-[14px]': value },
        className
      )}
    >
      <input
        className={'-z-1 absolute inset-0 cursor-pointer opacity-0'}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

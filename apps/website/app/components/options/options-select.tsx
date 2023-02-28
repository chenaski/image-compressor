import cn from 'classnames';
import type { FC } from 'react';

import { ArrowIcon } from '~/components/icons/arrow-icon';

export interface OptionsSelectProps {
  items: { title: string; value: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}
export const OptionsSelect: FC<OptionsSelectProps> = ({ items, onChange, value, placeholder, className }) => {
  return (
    <div className={cn('relative', className)}>
      <select
        className={cn(
          'w-full cursor-pointer appearance-none rounded-lg bg-[#f3f3f3] px-[8px] py-[6px] text-xs text-[#333] transition',
          { 'text-[#999]': !value }
        )}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {items.map(({ title, value }) => {
          return (
            <option key={title} value={value}>
              {title}
            </option>
          );
        })}
      </select>
      <ArrowIcon
        className={'pointer-events-none absolute top-[50%] right-[12px] translate-y-[-50%] text-[#222] opacity-50'}
      />
    </div>
  );
};

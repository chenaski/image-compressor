import cn from 'classnames';
import type { FC } from 'react';

import { ArrowIcon } from '~/components/icons/arrow-icon';

export interface OptionsSelectProps {
  label: string;
  items: { title: string; value: string }[];
  className?: string;
  onChange: (value: string) => void;
  value?: string;
}
export const OptionsSelect: FC<OptionsSelectProps> = ({ label, items, className, onChange, value }) => {
  return (
    <label className={`relative ${className}`}>
      <span className={'sr-only'}>{label}</span>
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
        <option value="" disabled selected hidden>
          -suffix
        </option>
        {items.map(({ title, value }) => {
          return (
            <option key={title} value={value}>
              {title}
            </option>
          );
        })}
      </select>
      <ArrowIcon className={'absolute top-[50%] right-[12px] mt-[2px] translate-y-[-50%] text-[#222] opacity-50'} />
    </label>
  );
};

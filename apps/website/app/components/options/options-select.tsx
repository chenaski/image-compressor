import type { ChangeEvent } from 'react';

import { ArrowIcon } from '~/components/icons/arrow-icon';
import type { Codecs } from '~/constants';
import { useOptions } from '~/stores/options';

export interface OptionsSelectProps {
  label: string;
  items: { title: string; value: Codecs }[];
  className?: string;
}
export const OptionsSelect: React.FC<OptionsSelectProps> = ({ label, items, className }) => {
  const target = useOptions((state) => state.target);
  const setTarget = useOptions((state) => state.setTarget);

  return (
    <label className={`relative ${className}`}>
      <span className={'sr-only'}>{label}</span>
      <select
        className={
          'h-[50px] w-full cursor-pointer appearance-none bg-gray-400 px-4 py-2 transition hover:shadow-[inset_0_0_0_2px] hover:shadow-gray-500 focus:outline-none focus:ring focus:ring-1 focus:ring-black'
        }
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setTarget(e.target.value as unknown as Codecs);
        }}
        value={target || items[0].value}
      >
        {items.map(({ title, value }) => {
          return (
            <option key={title} value={value}>
              {title}
            </option>
          );
        })}
      </select>
      <ArrowIcon className={'absolute top-[50%] right-4 translate-y-[-50%]'} />
    </label>
  );
};

import cn from 'classnames';
import type { FC } from 'react';

import { OptionsControlTitle } from '~/components/options/options-control-title';
import { OptionsSelect } from '~/components/options/options-select';

export interface OptionsSelectControlProps {
  label: string;
  items: { title: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const OptionsSelectControl: FC<OptionsSelectControlProps> = ({
  label,
  items,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <label className={cn('flex cursor-pointer items-center', className)}>
      <OptionsControlTitle className={'mr-auto'}>{label}</OptionsControlTitle>
      <OptionsSelect className={'w-[98px]'} items={items} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
};

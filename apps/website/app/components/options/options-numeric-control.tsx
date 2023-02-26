import cn from 'classnames';
import type { ChangeEvent, FC } from 'react';

import { OptionsInput } from '~/components/options/options-input';
import { OptionsRange } from '~/components/options/options-range';

export interface OptionsNumericControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const OptionsNumericControl: FC<OptionsNumericControlProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  className,
}) => {
  return (
    <div className={cn(`flex items-center`, className)}>
      <span className={'mr-auto text-xs font-medium text-[#666]'}>{label}</span>

      <label>
        <OptionsInput
          type="text"
          inputMode={'numeric'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value)}
          value={value}
        />
      </label>

      <label className={'ml-[12px] flex w-[90px] items-center'}>
        <span className="sr-only">{label}</span>
        <OptionsRange
          className={'w-full'}
          min={min}
          max={max}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value)}
        />
      </label>
    </div>
  );
};

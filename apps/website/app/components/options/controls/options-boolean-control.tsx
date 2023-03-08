import cn from 'classnames';
import type { FC } from 'react';

import { OptionsControlTitle } from '~/components/options/options-control-title';
import { OptionsSwitcher } from '~/components/options/options-switcher';

export interface OptionsBooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export const OptionsBooleanControl: FC<OptionsBooleanControlProps> = ({ label, value, onChange, className }) => {
  return (
    <label className={cn('flex cursor-pointer items-center', className)}>
      <OptionsControlTitle className={'mr-auto'}>{label}</OptionsControlTitle>
      <OptionsSwitcher className={'w-full'} value={value} onChange={(checked) => onChange(checked)} />
    </label>
  );
};

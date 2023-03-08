import cn from 'classnames';
import type { FC } from 'react';

import { OptionsBooleanControl } from '~/components/options/controls/options-boolean-control';
import { OptionsNumericControl } from '~/components/options/controls/options-numeric-control';
import { OptionsSelectControl } from '~/components/options/controls/options-select-control';
import type { OptionKey, OptionValue } from '~/constants';
import { options } from '~/constants';
import { useOptions } from '~/stores/options';

export interface OptionsPanelProps {
  className?: string;
}

export const OptionsPanel: FC<OptionsPanelProps> = ({ className }) => {
  const { target, options: optionsValues, setOption } = useOptions();
  const currentCodecOptions = options[target];
  const currentCodecOptionsValues = optionsValues[target];
  const onChange = (key: OptionKey) => (value: OptionValue) => setOption(key, value);

  return (
    <div className={cn('rounded-[12px] bg-white p-[15px] shadow-panel', className)}>
      <h2 className={'mb-[16px] text-xs font-semibold'}>Compress</h2>

      <div className={'grid grid-flow-row auto-rows-[38px]'}>
        {Object.entries(currentCodecOptions).map(([optionKey, optionData]) => {
          switch (optionData.type) {
            case 'numeric':
              return (
                <OptionsNumericControl
                  key={optionData.name}
                  label={optionData.name}
                  min={optionData.min}
                  max={optionData.max}
                  value={currentCodecOptionsValues[optionKey] as number}
                  onChange={onChange(optionKey as OptionKey)}
                />
              );
            case 'boolean':
              return (
                <OptionsBooleanControl
                  key={optionData.name}
                  label={optionData.name}
                  value={currentCodecOptionsValues[optionKey] as boolean}
                  onChange={onChange(optionKey as OptionKey)}
                />
              );
            case 'select':
              return (
                <OptionsSelectControl
                  key={optionData.name}
                  label={optionData.name}
                  items={optionData.items}
                  value={currentCodecOptionsValues[optionKey] as string}
                  onChange={onChange(optionKey as OptionKey)}
                  placeholder={optionData.placeholder}
                />
              );
          }
        })}
      </div>
    </div>
  );
};

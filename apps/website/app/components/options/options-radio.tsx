import * as RadioGroup from '@radix-ui/react-radio-group';
import cn from 'classnames';
import type { FC } from 'react';

import { CloseRoundedIcon } from '~/components/icons/close-rounded-icon';

export interface OptionsRadioProps {
  label: string;
  items: {
    id: string;
    title: string;
    value: string;
  }[];
  selectedItemId: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export const OptionsSwitcher: FC<OptionsRadioProps> = ({
  label,
  items,
  selectedItemId,
  onSelect,
  onRemove,
  className,
}) => {
  if (!items?.length) return null;

  return (
    <RadioGroup.Root
      className={cn('flex gap-x-2', className)}
      value={selectedItemId}
      aria-label={label}
      onValueChange={onSelect}
    >
      {items.map(({ id, title, value }) => {
        const isSelected = id === selectedItemId;

        return (
          <div
            key={id}
            className={cn(
              'flex h-[26px] justify-between rounded-[6px] ',
              isSelected
                ? 'bg-white text-[#0084FF] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.15)]'
                : 'bg-[#F3F3F3]'
            )}
          >
            <label>
              <RadioGroup.Item
                className={cn(
                  'font block h-full pl-[6px] text-xs uppercase',
                  isSelected ? 'font-semibold' : 'font-medium'
                )}
                value={id}
              >
                {title}
              </RadioGroup.Item>
            </label>

            <button className={'align-self-stretch p-[6px] text-[#222] hover:text-[#000]'} onClick={() => onRemove(id)}>
              <CloseRoundedIcon className={'transition'} />
            </button>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
};

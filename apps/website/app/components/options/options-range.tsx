import cn from 'classnames';
import type { ChangeEvent, FC } from 'react';

import { useOptions } from '~/stores/options';

export interface OptionsRangeProps {
  label: string;
  className?: string;
}

export const OptionsRange: FC<OptionsRangeProps> = ({ label, className }) => {
  const quality = useOptions((state) => state.quality);
  const setQuality = useOptions((state) => state.setQuality);

  return (
    <div className={cn(`flex items-center text-sm`, className)}>
      <span>{label}</span>

      <label className={'mx-[14px] flex grow items-center'}>
        <span className="sr-only">{label}</span>
        <input
          className={'range w-full'}
          style={{
            '--range-fill-percent': `${quality}%`,
          }}
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuality(+e.target.value)}
        />
      </label>

      <label>
        <input
          className={
            'w-[18px] appearance-none border-b border-dashed border-[#007AFF] bg-transparent text-center transition focus:outline-0'
          }
          type="text"
          inputMode={'numeric'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuality(+e.target.value)}
          value={quality}
        />
      </label>
    </div>
  );
};

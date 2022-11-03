import type { ChangeEvent } from 'react';
import { useOptions } from '~/stores/options';

export interface OptionsRangeProps {
  label: string;
  className?: string;
}
export const OptionsRange: React.FC<OptionsRangeProps> = ({ label, className }) => {
  const quality = useOptions((state) => state.quality);
  const setQuality = useOptions((state) => state.setQuality);

  return (
    <div className={className}>
      <label className={'flex justify-between'}>
        <span>{label}</span>
        <input
          className={
            'border border-gray-400 w-[34px] bg-transparent text-center appearance-none transition hover:border-gray-500 focus:outline-none focus:border-gray-500 focus:ring focus:ring-1 focus:ring-gray-500'
          }
          type="text"
          inputMode={'numeric'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuality(+e.target.value)}
          value={quality}
        />
      </label>
      <label className={'block mt-2'}>
        <span className="sr-only">{label}</span>
        <input
          className={'w-full range'}
          style={{
            '--range-fill-percent': `${quality}%`,
          }}
          type="range"
          min={0}
          max={100}
          value={quality}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuality(+e.target.value)}
        />
      </label>
    </div>
  );
};

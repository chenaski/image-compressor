import React from 'react';
import { OptionsConvert } from '~/components/options/options-convert';

export interface OptionsProps {
  className?: string;
}
export const Options: React.FC<OptionsProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 p-5 ${className}`}>
      <OptionsConvert />
    </div>
  );
};

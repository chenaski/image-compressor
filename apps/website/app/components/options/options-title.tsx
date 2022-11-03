import React from 'react';

export interface OptionsTitleProps {
  className?: string;
  children: string;
}
export const OptionsTitle: React.FC<OptionsTitleProps> = ({ className = '', children }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

import React from 'react';

import type { FCC } from '~/global';

export interface OptionsTitleProps {
  className?: string;
}
export const OptionsTitle: FCC<OptionsTitleProps> = ({ className = '', children }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

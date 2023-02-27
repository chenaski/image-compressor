import cn from 'classnames';

import type { FCC } from '~/global';

export interface OptionsTitleProps {
  className?: string;
}
export const OptionsControlTitle: FCC<OptionsTitleProps> = ({ className, children }) => {
  return <h2 className={cn(`text-xs font-medium text-[#666]`, className)}>{children}</h2>;
};

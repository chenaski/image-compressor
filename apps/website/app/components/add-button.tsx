import cn from 'classnames';
import type { FC, MouseEvent } from 'react';

import { CloseIcon } from '~/components/icons/close-icon';

export interface CloseButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const AddButton: FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-white shadow-button transition hover:bg-gray-50',
        className
      )}
    >
      <CloseIcon className={'rotate-45'} />
    </button>
  );
};

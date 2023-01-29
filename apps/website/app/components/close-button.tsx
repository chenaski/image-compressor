import type { FC, MouseEvent } from 'react';

import { CloseIcon } from '~/components/icons/close-icon';

export interface CloseButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={
        'absolute top-0 left-0 mt-4 ml-4 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-white shadow-button transition hover:bg-gray-50'
      }
    >
      <CloseIcon />
    </button>
  );
};

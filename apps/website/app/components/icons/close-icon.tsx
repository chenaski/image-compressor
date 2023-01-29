import type { FC } from 'react';

export const CloseIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="20" height="20" fill="#000" className={className}>
      <path d="m17.072 4.34-5.657 5.656 5.656 5.657-1.414 1.414L10 11.41l-5.656 5.657-1.415-1.414 5.657-5.657L2.93 4.34l1.415-1.414L10 8.582l5.657-5.657 1.415 1.414Z" />
    </svg>
  );
};

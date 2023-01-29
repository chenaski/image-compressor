import type { FC } from 'react';

export const ArrowIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="black" className={className}>
      <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" />
    </svg>
  );
};

import type { FC } from 'react';

export const ArrowIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="14" height="14" fill="none" className={className}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.313"
        d="M2.917 4.958 7 9.041l4.083-4.083"
      />
    </svg>
  );
};

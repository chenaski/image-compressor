import type { FC } from 'react';

export const ArrowIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="10" height="10" fill="none" viewBox="0 0 10 10" className={className}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        d="m1.597 3.298 3.402 3.403 3.403-3.403"
      />
    </svg>
  );
};

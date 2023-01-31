import type { FC } from 'react';

export const CheckMarkIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="14" height="14" fill="none" className={className}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="m2.79 8.226 3.088 3.254 5.832-8.46"
      />
    </svg>
  );
};

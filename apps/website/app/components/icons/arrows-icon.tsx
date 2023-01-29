import type { FC } from 'react';

export const ArrowsIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="37" height="19" fill="#000" className={className}>
      <path d="m23.841 1.394-.8.805 7.317 7.359-7.317 7.244.8.805 7.317-7.244.8-.805-.8-.805-7.317-7.36ZM13.159 1.394l.8.805-7.317 7.359 7.317 7.244-.8.805-7.317-7.244-.8-.805.8-.805 7.317-7.36Z" />
    </svg>
  );
};

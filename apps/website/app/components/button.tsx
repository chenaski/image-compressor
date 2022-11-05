import type { FCC } from '~/global';

export interface ButtonProps {
  fake?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
export const Button: FCC<ButtonProps> = ({ fake, onClick, className = '', children }) => {
  const classes = `inline-flex min-h-[60px] min-w-[280px] cursor-pointer items-center justify-center bg-black text-center text-[18px] text-white transition hover:bg-gray-800 ${className}`;

  if (fake) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

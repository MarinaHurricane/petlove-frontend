import css from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${css.button} ${css[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
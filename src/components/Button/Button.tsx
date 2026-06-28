import css from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${css.button} ${css[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
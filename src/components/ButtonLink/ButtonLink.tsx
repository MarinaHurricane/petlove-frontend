import css from "./ButtonLink.module.css";
import { Link, type LinkProps } from "react-router-dom";

type ButtonLinkProps = LinkProps & {
  variant?: "primary" | "secondary";
};

export const ButtonLink = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={`${css.link} ${css[variant]} ${className || ""}`}
    >
      {children}
    </Link>
  );
};

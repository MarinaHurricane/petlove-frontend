import css from './ButtonLink.module.css';
import { Link } from "react-router-dom";

type ButtonLinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
     variant?: 'primary' | 'secondary';
}

export const ButtonLink = ({
    to,
    children,
    className,
    variant = "primary",
    ...props
}: ButtonLinkProps) => {
    return (
        <Link to={to} className={`${css.link} ${css[variant]} ${className ?? ""}`} {...props}>{children}</Link>
    )
}
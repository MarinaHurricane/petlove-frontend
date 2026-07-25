import css from './Title.module.css'
import type { ReactNode } from "react"

type TitleProps = {
    children: ReactNode;
    className?: string;
}


export const Title = ({children, className}:TitleProps) => {
    return (
        <h2 className={`${css.title} ${className}`}>{children}</h2>
    )
}
import css from './Title.module.css'
import type { ReactNode } from "react"

type TitleProps = {
    children: ReactNode;
}


export const Title = ({children}:TitleProps) => {
    return (
        <h2 className={css.title}>{children}</h2>
    )
}
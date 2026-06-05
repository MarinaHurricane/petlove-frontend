import type { ReactNode } from 'react';
import css from './Container.module.css';

type ContainerProps = {
    children: ReactNode;
}

export const Container = ({children}: ContainerProps) => {
    return (
        <div className={css.container}>
            {children}
        </div>
    );
};
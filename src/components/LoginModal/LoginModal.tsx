import css from './LoginModal.module.css';
import { Button } from '../Button/Button';

export const LoginModal = () => {
    return (
        <>
        <p>Attention</p>
        <p>We would like to remind you that certain functionality is available only to authorized users.If you have an account, please log in with your credentials. If you do not already have an account, you must register to access these features.</p>
        <Button>Log in</Button>
        <Button variant='secondary'>Registration</Button>
        </>
    )

}
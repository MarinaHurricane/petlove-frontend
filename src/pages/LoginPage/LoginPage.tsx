import css from './LoginPage.module.css';
import { Title } from '../../components/Title/Title';
import { PetBlock } from '../../components/PetBlock/PetBlock';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import loginMobile1x from '../../assets/login-mobile-1x.png';
import loginMobile2x from '../../assets/login-mobile-2x.png';
import loginTablet1x from '../../assets/login-tablet-1x.png';
import loginTablet2x from '../../assets/login-tablet-2x.png';
import loginDesktop1x from '../../assets/login-desktop-1x.png';
import loginDesktop2x from '../../assets/login-desktop-2x.png';

const loginImages = {
  mobile1x: loginMobile1x,
  mobile2x: loginMobile2x,
  tablet1x: loginTablet1x,
  tablet2x: loginTablet2x,
  desktop1x: loginDesktop1x,
  desktop2x: loginDesktop2x,
}


export const LoginPage = () => {
    return (
        <>
        <PetBlock images={loginImages} alt="dog on the orange background"/>
        <Title>Log in</Title>
        <p className={css.registerParagraph}>Welcome! Please enter your credentials to login to the platform:</p>
        <LoginForm/>
        <p className={css.loginParagraph}>Don’t have an account? <span className={css.registerLink}><Link to="/register">Register</Link></span></p>
        </>
    )
    
}
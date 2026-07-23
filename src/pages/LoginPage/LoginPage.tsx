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
        <div className={css.loginPageWrapper}>
        <PetBlock species= "dog" images={loginImages} alt="dog on the orange background"/>
        <div className={css.formWrapper}>
        <Title>Log in</Title>
        <p className={css.loginParagraph}>Welcome! Please enter your credentials to login to the platform:</p>
        <LoginForm/>
        <p className={css.noticearagraph}>Don’t have an account? <span className={css.link}><Link to="/register">Register</Link></span></p>
        </div>
        </div>
    )
    
}
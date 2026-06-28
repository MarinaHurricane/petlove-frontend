import css from './RegisterPage.module.css';
import { Title } from '../../components/Title/Title';
import { PetBlock } from '../../components/PetBlock/PetBlock';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

import registerMobile1x from '../../assets/register-mobile-1x.png';
import registerMobile2x from '../../assets/register-mobile-2x.png';
import registerTablet1x from '../../assets/register-tablet-1x.png';
import registerTablet2x from '../../assets/register-tablet-2x.png';
import registerDesktop1x from '../../assets/register-desktop-1x.png';
import registerDesktop2x from '../../assets/register-desktop-2x.png';


const registerImages = {
  mobile1x: registerMobile1x,
  mobile2x: registerMobile2x,
  tablet1x: registerTablet1x,
  tablet2x: registerTablet2x,
  desktop1x: registerDesktop1x,
  desktop2x: registerDesktop2x,
};

export const RegisterPage = () => {
    return (
        <>
        <PetBlock images={registerImages} alt ="cat on the orange background"/>
        <Title>Registration</Title>
        <p className={css.registerParagraph}>Thank you for your interest in our platform.</p>
        <RegisterForm/>
        <p className={css.message}>Already have an account? <span className={css.link}><Link to="/login">Login</Link></span></p>
        </>
    )
    
}
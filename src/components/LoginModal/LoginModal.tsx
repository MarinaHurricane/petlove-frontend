import css from "./LoginModal.module.css";
import puppy from "../../assets/puppy.png";
import { ButtonLink } from "../ButtonLink/ButtonLink";

export const LoginModal = () => {
  return (
     <div className={css.modalWrapper}>
      <div className={css.iconWrapper}>
        <img src={puppy} alt="puppy-icon" />
      </div>

      <p className={css.paragraph}>Attention</p>
      <p className={css.notice}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.buttons}>
      <ButtonLink to="/login" className={css.link}>Log in</ButtonLink> 
      <ButtonLink to="/register" variant="secondary" className={css.link}>  Registration</ButtonLink>
      </div> 
    </div>
  );
};

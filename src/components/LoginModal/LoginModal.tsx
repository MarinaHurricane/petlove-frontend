import css from "./LoginModal.module.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import puppy from "../../assets/puppy.png";

export const LoginModal = () => {
  return (
    <>
      <div className={css.iconWrapper}>
        <img src={puppy} alt="puppy-icon" />
      </div>

      <p>Attention</p>
      <p>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <Link to="/login"><Button>Log in</Button></Link> 
      <Link to="/register">  <Button variant="secondary">Registration</Button></Link> 
    
    </>
  );
};

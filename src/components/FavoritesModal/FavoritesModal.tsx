import css from "./FavoritesModal.module.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import cat from "../../assets/cat.png";

export const FavoritesModal = () => {
  return (
    <div className={css.modalWrapper}>
      <div className={css.iconWrapper}>
        <img src={cat} alt="cat-icon" />
      </div>
      <p className={css.notice}>Congrats</p>
      <p className={css.comment}>
        The pet in the favorites! May your friendship be the happiest and filled
        with fun.
      </p>
      
        <Button className={css.button}><Link to="/profile">Go to profile </Link></Button>
     
    </div>
  );
};

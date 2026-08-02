import css from "./FavoritesModal.module.css";
import cat from "../../assets/cat.png";
import { ButtonLink } from "../ButtonLink/ButtonLink";

export const FavoritesModal = () => {
  return (
    <div className={css.modalWrapper}>
      <div className={css.iconWrapper}>
        <img src={cat} alt="" />
      </div>
      <h2 className={css.notice}>Congrats</h2>
      <p className={css.comment}>
        The pet in the favorites! May your friendship be the happiest and filled
        with fun.
      </p>

      <ButtonLink to="/profile">Go to profile</ButtonLink>
    </div>
  );
};

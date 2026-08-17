import { ButtonLink } from "../ButtonLink/ButtonLink";
import css from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className={css.navList}>
        <li>
          <ButtonLink to="/news" className={css.button}>
            News
          </ButtonLink>
        </li>
        <li>
          <ButtonLink to="/pets" className={css.button}>
            Find a pet
          </ButtonLink>
        </li>
        <li>
          <ButtonLink to="/friends" className={css.button}>
            Our friends
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
};

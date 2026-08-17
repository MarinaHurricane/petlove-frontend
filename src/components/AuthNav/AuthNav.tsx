import { useAuthStore } from "../../lib/store/authStore";
import css from "./AuthNav.module.css";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { NavLink } from "react-router-dom";

export const AuthNav = () => {
  const { user } = useAuthStore();
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          {user ? (
            <LogoutButton />
          ) : (
            <ButtonLink to="/login" className={css.navButton}>
              Log in
            </ButtonLink>
          )}
        </li>

        <li>
          {user ? (
            <NavLink to="/profile" className={css.userInfo}>
              <img src={user.avatar} className={css.avatar} />
              <p className={css.userName}>{user.name}</p>
            </NavLink>
          ) : (
            <ButtonLink to="/register" className={css.navButton}>
              Registration
            </ButtonLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

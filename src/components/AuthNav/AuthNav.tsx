import { useAuthStore } from "../../lib/store/authStore";
import { Button } from "../Button/Button";
import css from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";

export const AuthNav = () => {
  const { user } = useAuthStore();
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          {" "}
          {user ? (
            <Button>LOG OUT</Button>
          ) : (
            <NavLink to="/login">
              <button className={css.button}>LOG IN</button>
            </NavLink>
          )}
        </li>

        <li>
          {user ? (
            <div className={css.userInfo}>
              <img src={user.avatar}  className={css.avatar}/>
              <p className={css.userName}>{user.name}</p>
            </div>
          ) : (
            <NavLink to="/register">
              <button className={css.button}>REGISTRATION</button>
            </NavLink>
          )}{" "}
        </li>
      </ul>
    </nav>
  );
};

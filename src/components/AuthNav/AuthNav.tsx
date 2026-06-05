import css from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";

export const AuthNav = () => {
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          {" "}
          <NavLink to="/login">
            <button className={css.button}>LOG IN</button>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/register">
            <button className={css.button}>REGISTRATION</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from "../Icon/Icon";


export const NavBar = () => {
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          {" "}
          <NavLink to="/news">
            {" "}
            <button className={css.button}>News</button>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/pets">
            {" "}
            <button className={css.button}>Find a pet</button>
          </NavLink>
        </li>
        <li>
          {" "}
         
          <NavLink to="/friends">
            {" "}
            <button className={css.button}> Our friends</button>
          </NavLink>
        </li>
      </ul>
       {/* <Icon name="icon-chevron-down"/> */}
    </nav>
  );
};

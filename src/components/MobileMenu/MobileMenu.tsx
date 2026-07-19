import { Icon } from "../Icon/Icon";
import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../lib/store/authStore";

type MobileMenuProps = {
  variant: "default" | "home";
  onClose: () => void;
};

export const MobileMenu = ({
  onClose,
  variant = "default",
}: MobileMenuProps) => {
  const { user } = useAuthStore();
  return (
    <>
      {/* <div className={css.backdrop}> */}
      <div className={variant === "default" ? css.menu : css.menuHome}>
        <div className={css.iconWrap} onClick={onClose}>
          <Icon name="icon-cross-small" className={variant === "default" ? css.icon : css.iconHome}/>
        </div>

        <nav>
          <ul className={css.navList}>
            <li className={css.link}>
              {" "}
              <NavLink to="/news"  >
                {" "}
                <Button className={css.button} onClick={onClose}>News</Button>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/pets" >
                {" "}
                <Button className={css.button} onClick={onClose}>Find a pet</Button>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/friends" >
                {" "}
                <Button className={css.button} onClick={onClose}> Our friends</Button>
              </NavLink>
            </li>
          </ul>
          {/* <Icon name="icon-chevron-down"/> */}
        </nav>

        {user ? (
          <Button>LOG OUT</Button>
        ) : (
          <nav>
            <ul className={css.navList}>
              <li>
                {" "}
                <NavLink to="/login" >
                  <Button className={css.button} onClick={onClose}>LOG IN</Button>
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/register" >
                  <Button className={css.button} onClick={onClose}>REGISTRATION</Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

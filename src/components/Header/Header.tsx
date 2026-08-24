import { NavBar } from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { AuthNav } from "../AuthNav/AuthNav";
import { Icon } from "../Icon/Icon";
import { useState } from "react";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useAuthStore } from "../../lib/store/authStore";

type HeaderProps = {
  variant?: "home" | "default";
};

export const Header = ({ variant = "default" }: HeaderProps) => {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className={css.headerBox}>
        <NavLink to="/">
          <Icon
            name={variant === "home" ? "icon-logo" : "icon-logomain"}
            className={css.mainLogo}
          />
        </NavLink>
        <NavBar />

        <div className={css.mobileMenu}>
          <AuthNav />
          {user && (
            <NavLink to="/profile">
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className={css.mobileHeaderAuth}
              />
            </NavLink>
          )}
          <button
            type="button"
            className={css.iconWrap}
            onClick={openMenu}
            aria-label="Open menu"
          >
            <Icon name="icon-menu-01" className={css.menu} />
          </button>

          {isMenuOpen && <MobileMenu onClose={closeMenu} variant={variant} />}
        </div>
      </div>
    </header>
  );
};

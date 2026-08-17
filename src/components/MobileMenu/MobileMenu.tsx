import css from "./MobileMenu.module.css";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "../../lib/store/authStore";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { ButtonLink } from "../ButtonLink/ButtonLink";

type MobileMenuProps = {
  variant?: "default" | "home";
  onClose: () => void;
};

export const MobileMenu = ({
  onClose,
  variant = "default",
}: MobileMenuProps) => {
  const { user } = useAuthStore();
  return (
    <div className={variant === "default" ? css.menu : css.menuHome}>
      <div className={css.menuContainer}>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className={css.iconWrap}
        >
          <Icon
            name="icon-cross-small"
            className={variant === "default" ? css.icon : css.iconHome}
          />
        </button>

        <nav className={css.nav} aria-label="Main navigation">
          <ul className={css.navList}>
            <li>
              <ButtonLink to="/news" onClick={onClose}>
                News
              </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/pets" onClick={onClose}>
                Pets
              </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/friends" onClick={onClose}>
                Our friends
              </ButtonLink>
            </li>
          </ul>
        </nav>

        {user ? (
          <LogoutButton />
        ) : (
          <nav aria-label="Authentication">
            <ul className={css.authList}>
              <li>
                <ButtonLink
                  to="/login"
                  onClick={onClose}
                  className={css.navButton}
                >
                  Log in
                </ButtonLink>
              </li>
              <li>
                <ButtonLink
                  to="/register"
                  onClick={onClose}
                  className={css.navButton}
                >
                  Registration
                </ButtonLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

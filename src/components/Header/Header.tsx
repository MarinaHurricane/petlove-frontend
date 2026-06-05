import { NavBar } from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import yellowLogo from "./logo.svg";
import darkLogo from "./logomain.svg";
import css from "./Header.module.css";
import { AuthNav } from "../AuthNav/AuthNav";
import { Container } from "../Container/Container";

type LogoProps = {
  variant?: "home" | "default";
};

export const Header = ({ variant = "default" }: LogoProps) => {
  return (
    // <header className={variant === "home" ? css.home : css.default}>
    <header>
      {/* <Container> */}
      <div className={css.headerBox}>
        <NavLink to="/">
          {" "}
          <img
            className={css.logo}
            src={variant === "home" ? yellowLogo : darkLogo}
            alt="logo"
          />
        </NavLink>
        <NavBar />
        <AuthNav />
      </div>
      {/* </Container> */}
    </header>
  );
};

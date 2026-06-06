import { NavBar } from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import yellowLogo from "./logo.svg";
import darkLogo from "./logomain.svg";
import css from "./Header.module.css";
import { AuthNav } from "../AuthNav/AuthNav";
import { Container } from "../Container/Container";
import { Icon } from "../Icon/Icon";
import { useLocation } from "react-router-dom";

type LogoProps = {
  variant?: "home" | "default";
};

export const Header = ({ variant = "default" }: LogoProps) => {
  // const location = useLocation();
  // const isHomePage = location.pathname === '/';
  return (
    <header>
      {/* <Container> */}
      <div className={css.headerBox}>
        <NavLink to="/">
          {" "}
          <Icon name={variant === "home" ? "icon-logo" : "icon-logomain"} className={css.mainLogo}/>
         
        </NavLink>
        <NavBar />
        
       
        <div className={css.mobileMenu}>
           <AuthNav />
          {/* {isHomePage && <Icon name="icon-icon" className={css.auth}/>}  */}
         <Icon name="icon-menu-01" className={css.menu}/> 
        
         </div>
      </div>
    </header>
  );
};

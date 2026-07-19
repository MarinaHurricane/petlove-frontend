import { NavBar } from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import yellowLogo from "./logo.svg";
import darkLogo from "./logomain.svg";
import css from "./Header.module.css";
import { AuthNav } from "../AuthNav/AuthNav";
import { Container } from "../Container/Container";
import { Icon } from "../Icon/Icon";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useAuthStore } from "../../lib/store/authStore";

type LogoProps = {
  variant?: "home" | "default";
};

export const Header = ({ variant = "default" }: LogoProps) => {
  const {user} = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
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
           {user && <img src={user.avatar} className={css.mobileHeaderAuth}/>}
          {/* {isHomePage && <Icon name="icon-icon" className={css.auth}/>}  */}
          <div className={css.iconWrap} onClick={openMenu}>
             <Icon name="icon-menu-01" className={css.menu}/> 
          </div>

          {isMenuOpen && variant === "default" && <MobileMenu onClose={closeMenu} variant="default"/>}
          {isMenuOpen && variant === "home" && <MobileMenu onClose={closeMenu} variant="home"/>}
        
        
         </div>
      </div>
    </header>
  );
};

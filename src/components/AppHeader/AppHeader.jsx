import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyle from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";
 
const AppHeader = () => {

  // const isUserLoggedIn = useSelector((state) => state.user.isAuthCheck);

  // const profileLinkTo = isUserLoggedIn ? "/profile" : "/login";

  return (
    <header className={`${HeaderStyle.header} pt-4 pb-4`}>
      <nav className={HeaderStyle.nav}>
        <div className={`${HeaderStyle.list} mr-28`}>
          <NavLink
            to="/"
            className={`${HeaderStyle.link} pt-4 pb-4 pr-5 pl-5 mr-2`}
            activeClassName={HeaderStyle.activeLink}
          >
            <BurgerIcon type="primary" />
            <span className="text text_color_primary text_type_main-default ml-2">
              Конструктор
            </span>
          </NavLink>
          <NavLink
            to="/orders"
            className={`${HeaderStyle.link} ${HeaderStyle.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
            activeClassName={HeaderStyle.activeLink}
          >
            <ListIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={HeaderStyle.logo}>
          <Logo />
        </div>
        <div className={`${HeaderStyle.list} ${HeaderStyle.rightList}`}>
          <NavLink
            to="/profile"
            className={`${HeaderStyle.link} ${HeaderStyle.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
            activeClassName={HeaderStyle.activeLink}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

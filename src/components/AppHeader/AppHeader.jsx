import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AHStyles from "./AppHeader.module.css";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const AppHeader = () => {
  const location = useLocation();
  const history = useHistory();

  const updateSearchURL = (searchParams) => {
    const currentSearch = queryString.parse(location.search);
    const newSearch = { ...currentSearch, ...searchParams };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newSearch),
    });
  };

  return (
    <header className={`${AHStyles.header} pt-4 pb-4`}>
      <nav className={AHStyles.nav}>
        <div className={`${AHStyles.list} mr-28`}>
          <NavLink
            to="/"
            exact
            className={`${AHStyles.link} pt-4 pb-4 pr-5 pl-5 mr-2`}
            activeClassName={AHStyles.activeLink}
            onClick={() => {
              updateSearchURL({ section: "constructor" });
            }}
          >
            <BurgerIcon
              type={location.pathname === "/" ? "active" : "secondary"}
            />
            <span
              className={`text ${
                location.pathname === "/"
                  ? "text_color_active"
                  : "text_color_inactive"
              } text_type_main-default ml-2`}
            >
              Конструктор
            </span>
          </NavLink>
          <NavLink
            to="/feed"
            className={`${AHStyles.link} ${AHStyles.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
            activeClassName={AHStyles.activeLink}
            onClick={() => {
              updateSearchURL({ section: "orders" });
            }}
          >
            <ListIcon
              type={location.pathname === "/orders" ? "active" : "secondary"}
            />
            <span
              className={`text ${
                location.pathname === "/orders"
                  ? "text_color_active"
                  : "text_color_inactive"
              } text_type_main-default ml-2`}
            >
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={AHStyles.logo}>
          <Logo />
        </div>
        <div className={`${AHStyles.list} ${AHStyles.rightList}`}>
          <NavLink
            to="/profile"
            className={`${AHStyles.link} ${AHStyles.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
            activeClassName={AHStyles.activeLink}
            onClick={() => {
              updateSearchURL({ section: "profile" });
            }}
          >
            <ProfileIcon
              type={
                [
                  "/profile",
                  "/login",
                  "/forgot-password",
                  "/reset-password",
                  "/register",
                ].includes(location.pathname)
                  ? "active"
                  : "secondary"
              }
            />
            <span
              className={`text ${
                [
                  "/profile",
                  "/login",
                  "/forgot-password",
                  "/reset-password",
                  "/register",
                ].includes(location.pathname)
                  ? "text_color_active"
                  : "text_color_inactive"
              } text_type_main-default ml-2`}
            >
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

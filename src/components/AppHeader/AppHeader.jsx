import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyle from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={`${HeaderStyle.header} pt-4 pb-4`}>
      <nav className={HeaderStyle.nav}>
        <div className={`${HeaderStyle.list} mr-28`}>
          <a
            href="#"
            className={`${HeaderStyle.link} ${HeaderStyle.primaryLink} pt-4 pb-4 pr-5 pl-5 mr-2`}
          >
            <BurgerIcon type="primary" />
            <span className="text text_color_primary text_type_main-default ml-2">
              Конструктор
            </span>
          </a>
          <a
            href="#"
            className={`${HeaderStyle.link} ${HeaderStyle.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
          >
            <ListIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Лента заказов
            </span>
          </a>
        </div>
        <div className={HeaderStyle.logo}>
          <Logo />
        </div>
        <div className={`${HeaderStyle.list} ${HeaderStyle.rightList}`}>
          <a
            href="#"
            className={`${HeaderStyle.link} ${HeaderStyle.secondaryLink} pt-4 pb-4 pr-5 pl-5`}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

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
          <button
            className={`${HeaderStyle.button} pt-4 pb-4 pr-5 pl-5 mr-2`}
          >
            <BurgerIcon type="primary" />
            <span className="text text_color_primary text_type_main-default ml-2">
              Конструктор
            </span>
          </button>
          <button
            className={`${HeaderStyle.button} ${HeaderStyle.secondaryButton} pt-4 pb-4 pr-5 pl-5`}
          >
            <ListIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Лента заказов
            </span>
          </button>
        </div>
        <div className={HeaderStyle.logo}>
          <Logo />
        </div>
        <div className={`${HeaderStyle.list} ${HeaderStyle.rightList}`}>
          <button
            className={`${HeaderStyle.button} ${HeaderStyle.secondaryButton} pt-4 pb-4 pr-5 pl-5`}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Личный кабинет
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
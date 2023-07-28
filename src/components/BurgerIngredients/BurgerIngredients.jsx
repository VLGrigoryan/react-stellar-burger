import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./BurgerIngredients.module.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerContext } from "../BurgerContext/BurgerContext";

function BurgerIngredients({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [current, setCurrent] = useState("bun");

  const onTabClick = (tab) => {
    setCurrent(tab);
    const ref = document.getElementById(tab);
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = (item) => {
    setDetails(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className={BIStyle.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={BIStyle.tabs}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => onTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => onTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => onTabClick("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${BIStyle.container} pl-4 pr-4`}>
        {["bun", "sauce", "main"].map((tab) => (
          <div key={tab} id={tab}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
              {tab === "bun" ? "Булки" : tab === "sauce" ? "Соусы" : "Начинка"}
            </h2>
            <ul className={`${BIStyle["card-list"]} pl-4 pr-4`}>
              {data
                .filter((item) => item.type === tab)
                .map((item) => (
                  <Card key={item._id} data={item} onClick={openModal} />
                ))}
            </ul>
          </div>
        ))}
      </div>
      {isOpen && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails data={details} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropType).isRequired)
    .isRequired,
};

export default BurgerIngredients;

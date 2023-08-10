import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./BurgerIngredients.module.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setIngredientDetails,
  clearIngredientDetails,
} from "../../services/reducers/ingredientDetails";

function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const { isModalOpen, openModal, closeModal } = useModal();
  const { details } = useSelector((state) => state.ingredientDetails);
  const { data } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  const ingredientTabs = useMemo(() => ["bun", "sauce", "main"], []);

  const tabNames = useMemo(
    () => ({
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинка",
    }),
    []
  );

  const handleCardClick = useCallback(
    (item) => {
      dispatch(setIngredientDetails(item));
      openModal();
    },
    [dispatch, openModal]
  );

  const handleCloseCardModal = () => {
    clearIngredientDetails();
    closeModal();
  };

  const tabContents = useMemo(
    () =>
      ingredientTabs.map((tab) => (
        <div key={tab} id={tab}>
          <h2 className="text text_type_main-medium mt-10 mb-6">
            {tabNames[tab]}
          </h2>
          <ul className={`${BIStyle["card-list"]} pl-4 pr-4`}>
            {data
              .filter((item) => item.type === tab)
              .map((item) => (
                <Card
                  key={item._id}
                  data={item}
                  onClick={() => handleCardClick(item)}
                />
              ))}
          </ul>
        </div>
      )),
    [data, ingredientTabs, tabNames, handleCardClick]
  );

  const onTabClick = (tab) => {
    setCurrent(tab);
    const ref = document.getElementById(tab);
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = ["bun", "sauce", "main"];
    const headerHeight = 100;
    const scrollPosition = window.scrollY + headerHeight;

    for (const section of sections) {
      const ref = document.getElementById(section);
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= scrollPosition && rect.bottom >= scrollPosition) {
          setCurrent(section);
          break;
        }
      }
    }
  }, []);

  return (
    <section className={BIStyle.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={BIStyle.tabs}>
        {ingredientTabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            active={current === tab}
            onClick={() => onTabClick(tab)}
          >
            {tabNames[tab]}
          </Tab>
        ))}
      </div>
      <div className={`${BIStyle.container} pl-4 pr-4`}>{tabContents}</div>
      {isModalOpen && (
        <Modal onClose={handleCloseCardModal} title="Детали ингредиента">
          <IngredientDetails data={details} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropType).isRequired),
};

export default BurgerIngredients;

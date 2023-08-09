import React, {useMemo} from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currency from "../../images/currency-icon.svg";
import BCStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrder,
  clearOrderNumber,
  selectOrderNumber,
} from "../../services/reducers/order";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  clearConstructorList,
} from "../../services/reducers/constructorList";
import { ConstructorList } from "../ConstructorList/ConstructorList";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const orderNumber = useSelector(selectOrderNumber);
  const bun = useSelector((state) => state.constructorList.bun);
  const card = useSelector((state) => state.constructorList.ingredients);

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const totalCost = useMemo(() => {
    let initialPrice = 0;
    if (card && card.length > 0) {
      initialPrice += card
        .filter((ingredient) => ingredient.type !== "bun")
        .reduce((total, ingredient) => total + ingredient.price, 0);
    }
    if (bun && bun.price) {
      initialPrice += bun.price * 2;
    }
    return initialPrice;
  }, [card, bun]);


  const handleOrderClick = () => {
    const ingredientIds = card.map((ingredient) => ingredient._id);
    dispatch(fetchOrder(ingredientIds));
    openModal();
  };

  const handleCloseModal = () => {
    dispatch(clearOrderNumber());
    dispatch(clearConstructorList());
    closeModal();
  };

  return (
    <section
      className={`${BCStyle.section} mt-25 ${isHover ? BCStyle.borderHoverColor : ''}`}
      ref={dropRef}
    >
      <div className={`${BCStyle["section-container"]}`}>
        <div className={`${BCStyle.item} mb-4 ml-8`}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
        {card && (
          <ul className={BCStyle.list}>
            {card
              .filter((ingredient) => ingredient.type !== "bun")
              .map((card, index) => (
                <ConstructorList key={card.uuid} card={card} index={index} />
              ))}
          </ul>
        )}
        <div className={`${BCStyle.item} mt-4 ml-8`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
        <div className={`${BCStyle["section-footer"]} + mt-10 mr-6`}>
          <p className="text text_type_digits-medium">{totalCost}</p>
          <img className="ml-2 mr-10" alt="валюта" src={currency} />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            onClick={handleOrderClick}
          >
            Оформить заказ
          </Button>
        </div>
        {isModalOpen && orderNumber && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails number={orderNumber} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;

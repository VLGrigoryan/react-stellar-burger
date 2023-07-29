import React, { useState } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currency from "../../images/currency-icon.svg";
import BCStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { baseUrl } from "../../utils/api";
import {postOrder} from '../../utils/api'

const BurgerConstructor = ({ data, selectedItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const bun = data.filter((item) => item.type === "bun")[0];

  const getTotalCost = () => {
    if (!selectedItems) {
      return 0;
    }
    const ingredientCost = selectedItems.reduce((acc, itemIndex) => {
      return acc + data[itemIndex].price;
    }, 0);

    return 2 * bun.price + ingredientCost;
  };
  
  const handleOrderClick = async () => {
    try {
      const number = await postOrder(data, selectedItems);
      setOrderNumber(number);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderNumber(null);
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <section className={`${BCStyle.section} mt-25`}>
      <div className={`${BCStyle["section-container"]}`}>
        <div className={`${BCStyle.item} mb-4 ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={BCStyle.list}>
          {selectedItems.map((itemIndex, index) => (
            <li
              className={`${BCStyle.item} mr-4`}
              key={`selected-${data[itemIndex]._id}-${index}`}
            >
              <DragIcon />
              <ConstructorElement
                text={data[itemIndex].name}
                price={data[itemIndex].price}
                thumbnail={data[itemIndex].image}
              />
            </li>
          ))}
        </ul>
        <div className={`${BCStyle.item} mt-4 ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={`${BCStyle["section-footer"]} + mt-10 mr-6`}>
        <p className="text text_type_digits-medium">{getTotalCost()}</p>
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
    </section>
  );
};

export default BurgerConstructor;

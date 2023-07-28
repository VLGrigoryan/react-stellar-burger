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

const BurgerConstructor = ({
  data,
  selectedItems = [7, 2, 8, 11, 11, 1, 3, 4, 10, 12, 13],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data);
  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  const firstItem = data[0];

  return (
    <section className={`${BCStyle.section} mt-25`}>
      <div className={`${BCStyle["section-container"]}`}>
        <div className={`${BCStyle.item} mb-4 ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + " (верх)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <ul className={BCStyle.list}>
          {selectedItems.map((item, index) => (
            <li
              className={`${BCStyle.item} mr-4`}
              key={`selected-${item}-${index}`}
            >
              <DragIcon />
              <ConstructorElement
                text={data[item].name}
                price={data[item].price}
                thumbnail={data[item].image}
              />
            </li>
          ))}
        </ul>
        <div className={`${BCStyle.item} mt-4 ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + " (низ)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={`${BCStyle["section-footer"]} + mt-10 mr-6`}>
        <p className="text text_type_digits-medium">610</p>
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
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;

import React from "react";
import { data } from "../../utils/data";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import currency from "../../images/currency-icon.svg";
import BCStyle from "./BurgerConstructor.module.css";

const BurgerConstructor = ({
  selectedItems = [7, 2, 8, 11, 11, 1, 3, 4, 10, 12, 13],
}) => {
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
          {selectedItems.map((itemId, index) => (
            <li
              className={`${BCStyle.item} mr-4`}
              key={`selected-${itemId}-${index}`}
            >
              <DragIcon />
              <ConstructorElement
                text={data[itemId].name}
                price={data[itemId].price}
                thumbnail={data[itemId].image}
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
        <p
          style={{
            display: "flex",
          }}
          className="text text_type_digits-medium"
        >
          {610}
          <img className="ml-2" alt="валюта" src={currency} />
        </p>
        <Button htmlType="submit" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;

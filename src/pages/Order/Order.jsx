import React from "react";
import PropTypes from "prop-types";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OStyles from "./Order.module.css";
import OrderItem from "./OrderItem";

const Order = ({ order, ingredients, modal, huge, isUser }) => {
  const displayedIngredients = modal ? ingredients : ingredients.slice(0, 6);
  const getStatusAndColor = () => {
    if (!order) return { status: null, color: null };
    const status =
      order.status === "done"
        ? "Выполнен"
        : order.status === "pending"
        ? "Готовится"
        : "Создан";
    const color = status === "Выполнен" ? "#00CCCC" : "#F2F2F3";
    return { status, color };
  };
  const { status, color } = getStatusAndColor();

  return (
    <div
      className={`${huge} ${
        modal ? OStyles.modalOrderContainer : OStyles.orderContainer
      } `}
    >
      <p
        className={`${
          modal ? OStyles.modalOrderNumber : OStyles.orderNumber
        } text text_type_digits-default`}
      >
        #{order.number}
      </p>
      <FormattedDate
        className={`${
          modal ? OStyles.modalOrderDate : OStyles.orderData
        } text text_type_main-default text_color_inactive`}
        date={new Date(order.updatedAt)}
      />
      <p
        className={`${
          modal ? OStyles.modalOrderTitle : OStyles.orderTitle
        } text text_type_main-medium`}
      >
        {order.name}
      </p>
      {isUser || modal ? (
        <span className={`${OStyles.status} `}>
          <p
            className="text text_type_main-default mt-3 mb-0"
            style={{ color: color }}
          >
            {status}
          </p>
          {modal && <p className="text text_type_main-medium mt-15">Состав:</p>}
        </span>
      ) : null}
      <ul
        className={`${
          modal ? OStyles.modalIngredientsList : OStyles.ingredientsList
        }`}
      >
        {displayedIngredients.map((item, index) => {
          return (
            <OrderItem
              key={index}
              item={item}
              index={index}
              ingredientItem={
                modal ? OStyles.modalIngredientItem : OStyles.ingredientItem
              }
              ingredientImage={
                modal ? OStyles.modalIngredientImage : OStyles.ingredientImage
              }
              counter={modal ? OStyles.modalCounter : OStyles.counter}
              ingredientName={
                modal ? OStyles.modalIngredientName : OStyles.ingredientName
              }
              priceInfo={modal ? OStyles.modalPriceInfo : OStyles.priceInfo}
              statusCircle={
                modal ? OStyles.modalStatusCircle : OStyles.statusCircle
              }
              overlayItem={
                modal ? OStyles.modalOverlayItem : OStyles.overlayItem
              }
              modalView={false}
              quantity={ingredients.length}
            />
          );
        })}
      </ul>
      <figure className={modal ? OStyles.modalCardFigure : OStyles.cardFigure}>
        <p className="text text_type_digits-default mr-2">
          {order.ingredients.reduce((acc, id) => {
            const ingredient = ingredients.find((i) => i._id === id);
            return acc + (ingredient ? ingredient.price : 0);
          }, 0)}
        </p>
        <CurrencyIcon />
      </figure>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  modal: PropTypes.bool,
};

export default Order;

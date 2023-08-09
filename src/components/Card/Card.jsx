import React, { forwardRef } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CStyle from "./Card.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const Card = forwardRef(({ data, onClick }, ref) => {
  const cardKey = `${data._id}-${data.count || 0}`;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: data,
  });

  const handleClick = () => {
    onClick(data);
  };

  return (
      <li
        className={CStyle.card}
        key={cardKey}
        onClick={handleClick}
        ref={dragRef}
      >
        <div
          className={`${CStyle["card-container"]} pl-4 pr-4`}
          onClick={data.onClick}
        >
          <img src={data.image} alt={data.name} />
          {!!!data.__v > 0 && <Counter count={data.__v} size="default" />}
        </div>
        <div className={`${CStyle.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default mr-2">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{data.name}</p>
      </li>
  );
});

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
  data: PropTypes.shape(ingredientPropType.isRequired).isRequired,
};

export default Card;

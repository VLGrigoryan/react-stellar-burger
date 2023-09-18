import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderItem({
  item,
  ingredientItem,
  statusCircle,
  ingredientImage,
  counter,
  ingredientName,
  priceInfo,
  overlayItem,
  index,
  quantity,
}) {
  const zIndexStyle = { zIndex: quantity - index };

  return (
    <li className={ingredientItem} key={item.index} style={zIndexStyle}>
      <div className={statusCircle}>
        <img className={ingredientImage} src={item.image} alt={item.name} />
      </div>
      <p className={`${ingredientName} text text_type_main-default ml-4`}>
        {item.name}
      </p>
      <div className={priceInfo}>
        <p className="text text_type_digits-default">
          {item.__v} x {item.price}
        </p>
        <CurrencyIcon />
      </div>
      <>
        {item.__v > 1 && index < 5 && (
          <Counter extraClass={counter} count={item.__v} size="small" />
        )}
        {index === 5 && index <= 6 && (
          <div className={overlayItem}>
            <p className="text text_type_digits-default">+{quantity - 5}</p>
          </div>
        )}
      </>
    </li>
  );
}

export default OrderItem;

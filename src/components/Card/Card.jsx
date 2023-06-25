import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import CStyle from './Card.module.css';
import { ingredientPropType } from '../../utils/prop-types';

const Card = (props) => {
  const cardKey = `${props._id}-${props.count || 0}`;

  return (
    <li className={CStyle.card} key={cardKey}>
      <div className={`${CStyle['card-container']} pl-4 pr-4`} onClick={props.onClick}>
        <img src={props.image} alt={props.name} />
        {props.count > 0 && <Counter count={props.count} size="default" />}
      </div>
      <div className={`${CStyle.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">
        {props.name}
      </p>
    </li>
  );
};

Card.propTypes = ingredientPropType;

export default Card;

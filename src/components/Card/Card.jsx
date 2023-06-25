import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types';
import CStyle from './Card.module.css';

const Card = (props) => {
  const [count, setCount] = useState(props.count || 0);

  const handleItemClick = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    if (props.onClick) {
      props.onClick({ ...props, count: updatedCount });
    }
  };

  const cardKey = `${props._id}-${props.count || 0}`;

  return (
    <li className={CStyle.card} key={cardKey}>
      <div className={`${CStyle['card-container']} pl-4 pr-4`} onClick={handleItemClick}>
        <img src={props.image} alt={props.name} />
        {count > 0 && <Counter count={count} size="default" />}
      </div>
      <div style={{ display: 'flex' }} className="mt-1 mb-1">
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p style={{ minHeight: '48px', textAlign: 'center' }} className="text text_type_main-default">
        {props.name}
      </p>
    </li>
  );
};

Card.propTypes = ingredientPropType;

export default Card;
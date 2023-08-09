import React, { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CLStyle from "./ConstructorList.module.css";
import { removeIngredient, reorderIngredients } from "../../services/reducers/constructorList";

export const ConstructorList = ({ card, index }) => {
  const dispatch = useDispatch();
  const handleRemoveCard = () => dispatch(removeIngredient(card.uuid));


  const ref = useRef();

  const [, dropTarget] = useDrop({
    accept: "constructorList",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorderIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [, dragTarget] = useDrag({
    type: "constructorList",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = dragTarget.isDragging ? 0.3 : 1;

  dragTarget(dropTarget(ref));

  return (
    <div ref={ref} style={{ opacity }} className={`${CLStyle.item} mr-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        type={card.type}
        text={card.name}
        price={card.price}
        thumbnail={card.image_mobile}
        handleClose={handleRemoveCard}
      />
    </div>
  );
};

ConstructorList.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
};

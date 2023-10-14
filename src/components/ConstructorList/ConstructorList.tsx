import { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../hooks/reduxHooks";
import CLStyle from "./ConstructorList.module.css";
import {
  removeIngredient,
  reorderIngredients,
} from "../../services/reducers/constructorList";
import { Ingredient } from "../../types";

interface IConstructorListProp {
  card: Ingredient;
  index: number;
}

interface DragItem {
  index: number;
  type: string;
}

export const ConstructorList: FC<IConstructorListProp> = ({ card, index }) => {
  const dispatch = useDispatch();
  const handleRemoveCard = () => dispatch(removeIngredient(card.uuid));

  const ref = useRef<HTMLDivElement>(null);

  const [, dropTarget] = useDrop({
    accept: "constructorList",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex &&
        (hoverClientY ? hoverClientY : 0) < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex &&
        (hoverClientY ? hoverClientY : 0) > hoverMiddleY) {
        return;
      }
      dispatch(reorderIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragTarget] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: "constructorList",
    item: { index, type: "constructorList" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragTarget(dropTarget(ref));

  return (
    <div
      ref={ref}
      className={`${CLStyle.item} 
     ${isDragging ? CLStyle.dragging : ""}
      `}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={card.name}
        price={card.price}
        thumbnail={card.image_mobile}
        handleClose={handleRemoveCard}
      />
    </div>
  );
};

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Order from "../../pages/Order/Order";
import { deduplicateIngredients } from "../../utils/deduplicateIngredients";
import { wsActions } from "../../services/reducers/feed";
import { getWebSocketUrl } from "../../utils/getWebSocketUrl";

const FeedOrderPage = ({ isUser, isModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
   const data = useSelector((store) => store.ingredients.data);
  const order = useSelector((store) =>
    store.feed[isUser ? "myOrders" : "orders"].find((i) => i._id === id)
  );

  useEffect(() => {
    const wsUrl = getWebSocketUrl(isUser);
    dispatch({
      type: wsActions.wsInit,
      payload: { wsUrl, user: isUser },
    });
  }, [dispatch, isUser]);

  const ingredients = useMemo(() => {
    if (order) {
      return deduplicateIngredients(
        order.ingredients.map((id) => {
          const ingredient = data.find((i) => i._id === id);
          return { ...ingredient, __v: 1 };
        })
      );
    }
    return null;
  }, [order, data]);

  return (
    order && <Order order={order} ingredients={ingredients} modal={true} />
  );
};

export default FeedOrderPage;

import React, { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../../hooks/reduxHooks";
import { useParams } from "react-router-dom";
import Order from "../../pages/Order/Order";
import { deduplicateIngredients } from "../../utils/deduplicateIngredients";
import { wsActions } from "../../services/reducers/feed";
import { getWebSocketUrl } from "../../utils/getWebSocketUrl";



const FeedOrderPage: FC<{ isUser: boolean }> = ({ isUser }) => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
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
    return [];
  }, [order, data]);

  return <> {order && (
    <Order order={order} ingredients={ingredients} modal={true} huge={""} isUser={isUser} />
  )}
  </>

};

export default FeedOrderPage;
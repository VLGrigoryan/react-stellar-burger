import React, { useEffect, useCallback, FC } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "../../hooks/reduxHooks";
import Order from "./Order";
import { getWebSocketUrl } from "../../utils/getWebSocketUrl";
import { useModal } from "../../hooks/useModal";
import { deduplicateIngredients } from "../../utils/deduplicateIngredients";
import { wsActions } from "../../services/reducers/feed";
import { IOrder } from "../../types";

interface IFeedList {
  listClass: string;
  huge: string;
  isUser: boolean;
 
}

const FeedList: FC<IFeedList> = ({ listClass, huge, isUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.data);
  const { openModal } = useModal();
  const orders = useSelector(
    (store) => store.feed[isUser ? "myOrders" : "orders"]
  );

  useEffect(() => {
    const wsUrl = getWebSocketUrl(isUser);
    dispatch({
      type: wsActions.wsInit,
      payload: { wsUrl, user: isUser },
    });
    return () => {dispatch({ type: wsActions.wsClose });}
  }, [dispatch, isUser]);

  const handleOrderOpen = useCallback(
    (id: string, number: number) => {
      if (number && isUser) {
        openModal();
        history.push(`/profile/orders/${id}`, {
          background: history.location,
          order: number,
        });
      }
      if (number && !isUser) {
        openModal();
        history.push(`/feed/${id}`, {
          backgroundFeed: history.location,
          order: number,
        });
      }
    },
    [history, openModal, isUser]
  );

  return (
    <ul className={listClass}>
      {orders.map((order: IOrder) => (
        <li
          key={order._id}
          onClick={() => handleOrderOpen(order._id, order.number)}
        >
          <Order
            modal={false}  // Add this line

            isUser={isUser}
            huge={huge}
            order={order}
            ingredients={deduplicateIngredients(
              order.ingredients.map((id) => {
                const ingredient = data.find((i) => i._id === id);
                return { ...ingredient, __v: 1 };
              })
            )}
          />
        </li>
      ))}
    </ul>
  );
}

export default FeedList;

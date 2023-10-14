import { FC } from "react";
import ODStyle from "./OrderDetails.module.css";
import done from "../../images/done.svg";
import { useSelector } from "../../hooks/reduxHooks";
interface OrderDetailsProps {
  number: number;
}
const OrderDetails: FC<OrderDetailsProps> = () => {
  const { orderNumber } = useSelector(state => state.order)

  return (
    <div className={ODStyle.container}>
      <h3
        className={ODStyle.orderId + " text text_type_digits-large mt-4 mb-8"}
      >
        {orderNumber}
      </h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={done} alt="галочка" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}


export default OrderDetails;

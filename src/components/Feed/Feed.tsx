import { FC } from "react";
import { useSelector } from "../../hooks/reduxHooks";
import FPStyles from "./Feed.module.css";
import FeedList from "../../pages/Order/OrderList";

const FeedPage: FC = () => {
  const { orders, total, totalToday } = useSelector((store) => store.feed);

  const renderNumbers = (status: string) => (
    <ul className={FPStyles.orderNumbers}>
      {orders
        .filter((item) => item.status === status)
        .slice(0, 20)
        .map((item) => (
          <li
            key={item._id}
            className={`${status === "done"
              ? `${FPStyles.greenText} text text_type_digits-default`
              : ""
              }`}
          >
            {item.number}
          </li>
        ))}
    </ul>
  );

  return (
    <div className={FPStyles.feedContent}>
      <h2 className="text text_color_primary text_type_main-large mt-10 mb-5">
        Лента заказов
      </h2>
      <div className={FPStyles.flexContainer}>
        <FeedList
          listClass={FPStyles.orderContainer}
          isUser={false}
          huge={""}
        />
        <div className={FPStyles.orderBoard}>
          <div className={FPStyles.done}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            {renderNumbers("done")}
          </div>
          <div className={FPStyles.pending}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            {renderNumbers("pending")}
          </div>
          <div className={FPStyles.total}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className={`${FPStyles.largeText} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div className={FPStyles.today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${FPStyles.largeText} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;

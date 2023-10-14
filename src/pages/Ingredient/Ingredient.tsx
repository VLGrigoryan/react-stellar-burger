import React, { FC } from "react";
import IPStyles from "./Ingridient.module.css";
import { useSelector } from "../../hooks/reduxHooks";
import { useParams } from "react-router-dom";

const IngredientPage: FC = () => {
  const ingredients = useSelector(store => store.ingredients.data);
  const { id } = useParams<{ id: string }>();
  const data = ingredients.find((item) => item._id === id);
  if (!data) {
    return null;
  }
  const { image_large, name, calories, carbohydrates, fat, proteins } = data;

  return (
    <div className={`${IPStyles.wrapper} mr-25 ml-25`}>
      <h2 className="text text_type_main-large mt-30 mb-4">Детали ингредиента</h2>
      <figure className={IPStyles.figure}>
        <img
          className={`${IPStyles.img} mb-4`}
          src={image_large}
          alt={name}
        />
        <figcaption
          className={`${IPStyles.caption} text text_type_main-medium mb-8`}
        >
          {name}
        </figcaption>
      </figure>
      <ul className={IPStyles.grid}>
        {[
          { label: "Калории, ккал", value: calories },
          { label: "Белки, г", value: proteins },
          { label: "Жиры, г", value: fat },
          { label: "Углеводы, г", value: carbohydrates },
        ].map((item) => (
          <li className={IPStyles.flex} key={item.label}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              {item.label}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientPage;

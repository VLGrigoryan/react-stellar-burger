import { FC } from "react";
import IDStyle from "./IngredientDetails.module.css";
import { useSelector } from "../../hooks/reduxHooks";
import { useParams } from "react-router-dom";

const IngredientDetails: FC = () => {
  const ingredients = useSelector(store => store.ingredients.data);
  const { id } = useParams<{ id: string }>();
  const data = ingredients.find((item) => item._id === id);
  if (!data) {
    return null;
  }
  const { image_large, name, calories, carbohydrates, fat, proteins } = data;

  return (
    <div className={`${IDStyle.container} mr-25 ml-25`}>
      <figure className={`${IDStyle["image-container"]}`}>
        <img
          className={`${IDStyle.image} mb-4`}
          src={image_large}
          alt={name}
        />
        <figcaption className={`${IDStyle.caption} text text_type_main-medium`}>
          {name}
        </figcaption>
      </figure>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Калории, ккал
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {calories}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Белки, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {proteins}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Жиры, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {fat}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Углеводы, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {carbohydrates}
        </p>
      </div>
    </div>
  );
}

export default IngredientDetails;

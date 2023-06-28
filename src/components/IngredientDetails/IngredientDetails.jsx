import React from "react";
import IDStyle from "./IngredientDetails.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = ({ data }) => {
  if (!data) return null;

  const { image_large, name, calories, proteins, fat, carbohydrates } = data;

  return (
    <div  className={`${IDStyle.container} mr-25 ml-25`}> 
      <figure className={`${IDStyle["image-container"]}`}>
        <img className={`${IDStyle.image} mb-4`} src={image_large} alt={name} />
        <figcaption
          className={`${IDStyle.caption} text text_type_main-medium`}
        >
          {name}
        </figcaption>
      </figure>
        <div className={`${IDStyle.discription}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </div>
        <div className={`${IDStyle.discription}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className={`${IDStyle.discription}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </div>
        <div className={`${IDStyle.discription}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
    </div>
  );
};

IngredientDetails.prototype = ingredientPropType

export default IngredientDetails;

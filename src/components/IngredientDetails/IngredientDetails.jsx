import React from "react";
import PropTypes from "prop-types";
import IDStyle from "./IngredientDetails.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = ({ data }) => {
  return (
    <div className={`${IDStyle.container} mr-25 ml-25`}>
      <figure className={`${IDStyle["image-container"]}`}>
        <img
          className={`${IDStyle.image} mb-4`}
          src={data.image}
          alt={data.name}
        />
        <figcaption className={`${IDStyle.caption} text text_type_main-medium`}>
          {data.name}
        </figcaption>
      </figure>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Калории, ккал
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {data.calories}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Белки, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {data.proteins}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Жиры, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {data.fat}
        </p>
      </div>
      <div className={`${IDStyle.description}`}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          Углеводы, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {data.carbohydrates}
        </p>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape(ingredientPropType.isRequired).isRequired,
};

export default IngredientDetails;

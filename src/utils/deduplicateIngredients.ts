import { Ingredient } from "../types";

export const deduplicateIngredients = (arr: any[]) => {
  const deduplicated: Ingredient[] = [];

  arr.forEach((elem: Ingredient) => {
    const existingIngredient = deduplicated.find((item) => item._id === elem._id);

    if (existingIngredient) {
      existingIngredient.__v += 1;
    } else {
      deduplicated.push(elem);
    }
  });

  return deduplicated;
};
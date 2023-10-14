import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../types";

const initialState: { data: Ingredient | null } = {
  data: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.data = action.payload;
    },
    clearIngredientDetails(state) {
      state.data = null;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } =
  ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;

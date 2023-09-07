import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;

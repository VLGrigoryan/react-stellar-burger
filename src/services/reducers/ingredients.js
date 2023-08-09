import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    fetchIngredientsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchIngredientsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchIngredientsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIngredientsStart, fetchIngredientsSuccess, fetchIngredientsError } = ingredientsSlice.actions;

export const fetchIngredients = () => async (dispatch) => {
  try {
    dispatch(fetchIngredientsStart());
    const res = await request("/api/ingredients");
    dispatch(fetchIngredientsSuccess(res.data));
  } catch (error) {
    dispatch(fetchIngredientsError(error.message));
  }
};

export default ingredientsSlice.reducer;
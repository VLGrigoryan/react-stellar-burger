import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";
import { Ingredient, IngredientState } from "../../types";
import { TRootState } from "../store";

const initialState: IngredientState = {
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
    fetchIngredientsSuccess(state, action: PayloadAction<Ingredient[]>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchIngredientsError(state, action: PayloadAction<Error | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsError,
} = ingredientsSlice.actions;

export const fetchIngredients =
  (): ThunkAction<void, TRootState, unknown, any> => async (dispatch) => {
    try {
      dispatch(fetchIngredientsStart());
      const res = await getIngredients();
      dispatch(fetchIngredientsSuccess(res.data));
    } catch (error: any) {
      dispatch(fetchIngredientsError(error.message));
    }
  };

export default ingredientsSlice.reducer;

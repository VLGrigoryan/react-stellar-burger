import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import constructorSlice from "./reducers/constructorList";
import ingredientsSlice from "./reducers/ingredients";
import ingredientDetailsSlice from "./reducers/ingredientDetails";
import orderSlice from "./reducers/order";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    constructorList: constructorSlice,
    ingredients: ingredientsSlice,
    ingredientDetails: ingredientDetailsSlice,
    order: orderSlice,
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware],

});

export default store;


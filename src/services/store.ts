import { configureStore } from "@reduxjs/toolkit";
import constructorSlice from "./reducers/constructorList";
import ingredientsSlice from "./reducers/ingredients";
import ingredientDetailsSlice from "./reducers/ingredientDetails";
import orderSlice from "./reducers/order";
import userSlice from "./reducers/user";
import socketSlice, { wsActions } from "./reducers/feed";
import { socketMiddleware } from "./middleware/middleware";

export const store = configureStore({
  reducer: {
    constructorList: constructorSlice,
    ingredients: ingredientsSlice,
    ingredientDetails: ingredientDetailsSlice,
    order: orderSlice,
    user: userSlice,
    feed: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/api";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (ingredientIds) => {
    const response = await request("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    return response.order.number;
  }
);

const initialState = {
  orderNumber: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },
    clearOrderNumber(state) {
      state.orderNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orderNumber = action.payload;
    });
  },
});

export const { setOrderNumber, clearOrderNumber } = orderSlice.actions;
export const selectOrderNumber = (state) => state.order.orderNumber;
export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../utils/api";
import { StoreState, TOrderState, TGetOrder } from "../../types";

export const fetchOrder = createAsyncThunk<number | null, TGetOrder>(
  "order/fetchOrder",
  async ({ bun, card }) => {
    const response = await createOrder({ bun, card });
    return response.order.number;
  }
);

const initialState: TOrderState = {
  orderNumber: null,
  isLoading: false,
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
    builder.addCase(fetchOrder.fulfilled, (state = initialState, action) => {
      state.orderNumber = action.payload;
    });
  },
});

export const { setOrderNumber, clearOrderNumber } = orderSlice.actions;
export const selectOrderNumber = (state: StoreState) => state.order.orderNumber;
export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TSocketState } from "../../types";

const initialState: TSocketState = {
  connected: false,
  orders: [],
  myOrders: [],
  total: null,
  totalToday: null,
  error: null,
};

const socketSlice = createSlice({
  name: "WS",
  initialState,
  reducers: {
    connectionSuccess(state) {
      state.connected = true;
      state.error = null;
      console.log("WebSocket connection successful");
    },
    connectionError(state, action) {
      state.connected = false;
      state.error = action.payload;
      console.error("WebSocket connection error:", action.payload);
    },
    connectionClosed(state) {
      state.error = null;
      state.connected = false;
      state.orders = [];
      state.myOrders = [];
      console.log("WebSocket connection closed");
    },
    setOrders(state, action) {
      state.error = null;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      console.log("Orders received:", action.payload.orders.length);
    },
    setMyOrders(state, action) {
      state.error = null;
      state.myOrders = action.payload.orders.reverse();
      console.log("My orders received:", action.payload.orders.length);
    },
  },
});

export const {
  connectionSuccess,
  connectionError,
  connectionClosed,
  setOrders,
  setMyOrders,
} = socketSlice.actions;

const WS_CONNECTION_START = "WS_CONNECTION_START";
const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: connectionSuccess,
  onClose: connectionClosed,
  onError: connectionError,
  onMessage: setOrders,
  onUserMessage: setMyOrders,
};

export type TwsActions = typeof wsActions;

export default socketSlice.reducer;

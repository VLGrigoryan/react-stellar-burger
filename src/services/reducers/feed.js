import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    },
    connectionError(state, action) {
      state.connected = false;
      state.error = action.payload;
    },
    connectionClosed(state) {
      state.error = null;
      state.connected = false;
      state.orders = [];
      state.myOrders = [];
    },
    setOrders(state, action) {
      state.error = null;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setMyOrders(state, action) {
      state.error = null;
      state.myOrders = action.payload.orders.reverse();
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

const WS_CONNECTION_START = 'WS_CONNECTION_START';
const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: connectionSuccess,
  onClose: connectionClosed,
  onError: connectionError,
  onMessage: setOrders,
  onUserMessage: setMyOrders,
};

export default socketSlice.reducer;

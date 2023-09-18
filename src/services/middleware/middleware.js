export const socketMiddleware = (wsActions) => (store) => (next) => (action) => {
  const { dispatch } = store;
  const { type, payload } = action;
  const { wsInit, onOpen, onClose, onError, onMessage, onUserMessage, wsClose } = wsActions;

  if (type === wsInit) {
    const socket = new WebSocket(payload.wsUrl);

    socket.onopen = () => dispatch(onOpen());
    socket.onerror = (event) => dispatch(onError(event.message));
    socket.onclose = () => dispatch(onClose());
    socket.onmessage = (event) => {
      const { data } = event;
      const { success, ...restParsedData } = JSON.parse(data);
      dispatch(payload.user ? onUserMessage(restParsedData) : onMessage(restParsedData));
    };
    store.socket = socket;
  }

  if (type === wsClose && store.socket) {
    store.socket.onclose = () => {
      dispatch(onClose());
    };
  }
  next(action);
};

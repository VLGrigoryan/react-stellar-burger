import { Middleware, MiddlewareAPI } from "redux";
import { TwsActions } from "../reducers/feed";
import { TAppDispatch, TRootState } from "../store";

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        onUserMessage,
        wsClose,
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload.wsUrl);

        socket.onopen = () => dispatch(onOpen());
        socket.onerror = (event) => dispatch(onError(event.AT_TARGET));
        socket.onclose = () => dispatch(onClose());
        socket.onmessage = (event) => {
          const { data } = event;
          const { success, ...restParsedData } = JSON.parse(data);
          dispatch(
            payload.user
              ? onUserMessage(restParsedData)
              : onMessage(restParsedData)
          );
        };
      }

      if (type === wsClose && socket) {
        socket.onclose = () => {
          dispatch(onClose());
        };
      }
      next(action);
    };
  };
};

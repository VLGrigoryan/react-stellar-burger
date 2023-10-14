import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux";
  import { TAppDispatch, TRootState } from "../services/store";
  
  export const useDispatch = () => dispatchHook<TAppDispatch>();
  export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
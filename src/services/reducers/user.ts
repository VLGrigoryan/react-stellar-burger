import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logInApi,
  logOutApi,
  getUserApi,
  registerApi,
  changeUserApi,
} from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { UserData, UserState } from "../../types";
import { TAppDispatch } from "../store";

const initialState: UserState = {
  isAuthCheck: false,
  isLoading: false,
  data: {
    email: null,
    name: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserData; success: boolean }>
    ) => {
      const { user, success } = action.payload;
      state.data = user;
      state.isAuthCheck = success;
      if (success) {
        localStorage.setItem("authentication", "true");
      } else {
        localStorage.removeItem("authentication");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetUser: (state) => {
      state.isAuthCheck = false;
      state.data = { email: null, name: null };
      localStorage.removeItem("authentication");
    },
  },
});

export const { setUser, setLoading, resetUser } = userSlice.actions;

export const loginUser =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: TAppDispatch) => {
    try {
      const res = await logInApi({ email, password });

      if (res.success) {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        setCookie("refresh", res.refreshToken);
        dispatch(setUser(res));
      }
      return res;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  };

export const logOutUser = () => async (dispatch: TAppDispatch) => {
  const res = await logOutApi();
  if (res.success) {
    deleteCookie("token");
    deleteCookie("refresh");
    dispatch(resetUser());
  }
  return res;
};

export const fetchUserData = () => (dispatch: TAppDispatch) => {
  dispatch(setLoading(true));
  getUserApi()
    .then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      } else if (res.status === 403) {
        dispatch(
          setUser({ user: { email: null, name: null }, success: false })
        );
      }
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setLoading(false)));
};

export const registerUser =
  ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) =>
  (dispatch: TAppDispatch) => {
    return registerApi({ email, password, name }).then((res) => {
      dispatch(setUser(res));
      return res;
    });
  };

export const changeUserData = (user: UserData) => (dispatch: TAppDispatch) => {
  changeUserApi(user)
    .then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      }
    })
    .catch((err) => console.log(err));
};

export default userSlice.reducer;

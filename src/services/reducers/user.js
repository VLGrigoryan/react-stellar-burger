import { createSlice } from "@reduxjs/toolkit";
import {
  logInApi,
  logOutApi,
  getUserApi,
  registerApi,
  changeUserApi,
} from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";

const initialState = {
  isAuthCheck: localStorage.getItem("authentication") === "true",
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
    setUser: (state, action) => {
      const { user, success } = action.payload;
      state.data = user;
      state.isAuthCheck = success;
      if (success) {
        localStorage.setItem("authentication", "true");
      } else {
        localStorage.removeItem("authentication");
      }
    },
    setLoading: (state, action) => {
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


export const loginUser = ({ email, password }) => async (dispatch) => {
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

export const logOutUser = () => async (dispatch) => {
  const res = await logOutApi();
  if (res.success) {
    deleteCookie("token");
    deleteCookie("refresh");
    dispatch(resetUser());
  }
  return res;
};

export const fetchUserData = () => (dispatch) => {
  dispatch(setLoading(true));
  getUserApi()
    .then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      } else if (res.status === 403) {
        dispatch(setUser({ user: null, success: false }));
      }
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setLoading(false)));
};

export const registerUser = ({ email, password, name }) => (dispatch) => {
  return registerApi({ email, password, name }).then((res) => {
    dispatch(setUser(res));
    return res;
  });
};

export const changeUserData = (user) => (dispatch) => {
  changeUserApi(user)
    .then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      }
    })
    .catch((err) => console.log(err));
};

export default userSlice.reducer;

import { getCookie } from './cookie';

const baseUrl = 'https://norma.nomoreparties.space/api';

const defaultHeaders = {
  "Content-Type": "application/json",
};

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  });
};

export const getIngredients = () => request("/ingredients");

export const createOrder = (ingredientIds) =>
  request("/orders", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

export const getUserApi = () => {
  const token = getCookie("token");
  const headers = {
    ...defaultHeaders,
    Authorization: "Bearer " + token,
  };
  return request(`/auth/user`, { headers });
};

export const changeUserApi = (userData) => {
  const token = getCookie("token");
  const headers = {
    ...defaultHeaders,
    Authorization: "Bearer " + token,
  };
  return request(`/auth/user`, {
    headers,
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const logInApi = ({ email, password }) => {
  const body = JSON.stringify({ email, password });
  return request("/auth/login", {
    headers: defaultHeaders,
    method: "POST",
    body,
  });
};

export const logOutApi = () => {
  const token = getCookie("refresh");
  return request(`/auth/logout`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ token }),
  });
};

export const registerApi = ({ email, password, name }) => {
  return request(`/auth/register`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

export const requestResetUserPassword = (email) => {
  return request(`/password-reset`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordApi = (data) => {
  return request(`/password-reset/reset`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ password: data.password, token: data.token }),
  });
};

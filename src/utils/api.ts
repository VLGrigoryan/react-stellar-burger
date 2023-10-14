// import { getCookie, setCookie } from "./cookie";
// const baseUrl = 'https://norma.nomoreparties.space/api';

// const defaultHeaders = {
//   "Content-Type": "application/json",
// };

// const request = (endpoint, options) => {
//   return fetch(`${baseUrl}${endpoint}`, options).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     if (res.status === 403) {
//       console.log("User is not authorized.");
//       return Promise.reject(`Error ${res.status}`);
//     }
//     return Promise.reject(`Error ${res.status}`);
//   });
// };
// export const getIngredients = () => request("/ingredients");

// export const createOrder = ({ bun, ingredientIds }) =>
//   request("/orders", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + getCookie("token")
//     },
//     body: JSON.stringify({ ingredients: [bun._id, bun._id, ...ingredientIds] }),
//   });

// export const getUserApi = () => {
//   const token = getCookie("token");
//   if (!token) {
//     console.log("User is not authenticated.");
//     return Promise.reject("User is not authenticated");
//   }
//   const headers = {
//     ...defaultHeaders,
//     Authorization: "Bearer " + token,
//   };
//   return request(`/auth/user`, { headers });
// };

// export const changeUserApi = (userData) => {
//   const token = getCookie("token");
//   const headers = {
//     ...defaultHeaders,
//     Authorization: "Bearer " + token,
//   };
//   return request(`/auth/user`, {
//     headers,
//     method: "PATCH",
//     body: JSON.stringify(userData),
//   });
// };

// export const logInApi = ({ email, password }) => {
//   const body = JSON.stringify({ email, password });
//   return request("/auth/login", {
//     headers: defaultHeaders,
//     method: "POST",
//     body,
//   });
// };

// export const logOutApi = () => {
//   const token = getCookie("refresh");
//   return request(`/auth/logout`, {
//     headers: defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({ token }),
//   });
// };

// export const registerApi = ({ email, password, name }) => {
//   return request(`/auth/register`, {
//     headers: defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({ email, password, name }),
//   });
// };

// export const requestResetUserPassword = (email) => {
//   return request(`/password-reset`, {
//     headers: defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });
// };

// export const resetPasswordApi = (user) => {
//   return request(`/password-reset/reset`, {
//     headers: defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({ password: user.password, token: user.token }),
//   });
// };

// export const refreshToken = () => {
//   return request(`/auth/token`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify({
//       token: getCookie("refresh"),
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка ${res.status}`);
//   })
//     .then((res) => {
//       setCookie("token", res.accessToken.split("Bearer ")[1]);
//       setCookie("refresh", res.refreshToken);
//     });
// };
import { getCookie, setCookie } from "./cookie";
import { TGetOrder } from "../types";

const baseUrl = "https://norma.nomoreparties.space/api";

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

const request = (endpoint: string, options: RequestInit) => {
  return fetch(`${baseUrl}${endpoint}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 403) {
      console.log("User is not authorized.");
      return Promise.reject(`Error ${res.status}`);
    }
    return Promise.reject(`Error ${res.status}`);
  });
};

export const getIngredients = () => request("/ingredients", {});

export const createOrder = ({ bun, card }: TGetOrder) =>
  request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: [
        bun?._id,
        bun?._id,
        ...(card?.map((item) => item._id) ?? []),
      ],
    }),
  });

export const getUserApi = () => {
  const token = getCookie("token");
  if (!token) {
    console.log("User is not authenticated.");
    return Promise.reject("User is not authenticated");
  }
  const headers: Record<string, string> = {
    ...defaultHeaders,
    Authorization: "Bearer " + token,
  };
  return request(`/auth/user`, { headers });
};

export const changeUserApi = (userData: any) => {
  const token = getCookie("token");
  const headers: Record<string, string> = {
    ...defaultHeaders,
    Authorization: "Bearer " + token,
  };
  return request(`/auth/user`, {
    headers,
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const logInApi = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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

export const registerApi = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return request(`/auth/register`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

export const requestResetUserPassword = (email: string) => {
  return request(`/password-reset`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordApi = (user: { password: string; token: string }) => {
  return request(`/password-reset/reset`, {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({ password: user.password, token: user.token }),
  });
};

export const refreshToken = () => {
  return request(`/auth/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refresh"),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1]);
      setCookie("refresh", res.refreshToken);
    });
};

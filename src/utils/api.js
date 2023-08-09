const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

export function getIngredients() {
  return request("/ingredients");
}

export function createOrder(ingredientIds) {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
}

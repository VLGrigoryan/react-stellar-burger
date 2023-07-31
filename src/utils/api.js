export const baseUrl = 'https://norma.nomoreparties.space';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

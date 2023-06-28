const baseUrl = 'https://norma.nomoreparties.space';

export const fetchIngredients = () => {
  return fetch(`${baseUrl}/api/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
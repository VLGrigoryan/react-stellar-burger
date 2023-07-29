export const baseUrl = 'https://norma.nomoreparties.space';

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

export const postOrder = async (data, selectedItems) => {
  try {
    const ingredientIds = selectedItems.map((itemIndex) => data[itemIndex]._id);
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.order.number;
    } else {
      throw new Error(`Ошибка ${response.status}`);
    }
  } catch (error) {
    throw new Error(error);
  }
};
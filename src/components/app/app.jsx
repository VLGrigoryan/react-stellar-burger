import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AppStyle from './App.module.css';

const App = () => {
  const [constructorItems, setConstructorItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToConstructor = (product) => {
    const existingProductIndex = constructorItems.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      const updatedItems = [...constructorItems];
      updatedItems[existingProductIndex] = {
        ...updatedItems[existingProductIndex],
        count: updatedItems[existingProductIndex].count + 1,
      };
      setConstructorItems(updatedItems);
    } else {
      setConstructorItems(prevItems => [
        ...prevItems,
        { ...product, id: Date.now(), count: 1 }
      ]);
    }
  
    setTotalPrice(prevPrice => prevPrice + product.price);
  };
  
  const deleteFromConstructor = (productId, price, count) => {
    const existingProductIndex = constructorItems.findIndex(item => item.id === productId);
  
    if (existingProductIndex !== -1) {
      const updatedItems = [...constructorItems];
  
      if (count > 1) {
        updatedItems[existingProductIndex] = {
          ...updatedItems[existingProductIndex],
          count: updatedItems[existingProductIndex].count - 1,
        };
      } else {
        updatedItems.splice(existingProductIndex, 1);
      }
  
      setConstructorItems(updatedItems);
      setTotalPrice(prevPrice => prevPrice - (price * count));
    }
  };

  const handleItemClick = (item) => {
    addToConstructor({ ...item, count: item.count + 1 });
  };

  const handleRemoveClick = (item) => {
    if (item.count > 0) {
      deleteFromConstructor(item.id, item.price, item.count);
    }
  };

  return (
    <>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients onAddToConstructor={addToConstructor} />
        <BurgerConstructor
          constructorItems={constructorItems}
          onDeleteFromConstructor={deleteFromConstructor}
          totalPrice={totalPrice}
          onItemClick={handleItemClick}
          onRemoveClick={handleRemoveClick}
        />
      </main>
    </>
  );
};

export default App;

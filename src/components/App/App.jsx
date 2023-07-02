import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AppStyle from './App.module.css';
import { fetchIngredients } from '../../utils/api'; // Update the path accordingly

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const fetchedData = await fetchIngredients();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor selectedItems={[7, 2, 8, 11, 11, 1, 3, 4, 10, 12, 13]} />
      </main>
    </>
  );
}

export default App;
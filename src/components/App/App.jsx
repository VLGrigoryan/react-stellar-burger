import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import AppStyle from './App.module.css';

const App = () => {

  return (
    <>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
};

export default App;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from "./App.module.css";
import { fetchIngredients } from "../../services/reducers/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);


  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default App;
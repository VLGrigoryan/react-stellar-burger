import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import styles from "./Home.module.css";

function HomePage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default HomePage;

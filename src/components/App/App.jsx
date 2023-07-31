import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from "./App.module.css";
import { fetchIngredients } from "../../utils/api";
import { BurgerContext } from "../contexts/BurgerContext";

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
      <BurgerContext.Provider value={{ data }}>
        <AppHeader />
        <main className={AppStyle.content}>
          <BurgerIngredients data={data} />
          <BurgerConstructor
            data={data}
            selectedItems={[8, 5, 11, 10, 10, 1, 2, 6, 12, 13, 14]}
          />
        </main>
      </BurgerContext.Provider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from "./App.module.css";
import { request } from "../../utils/api";
import { BurgerContext } from "../../contexts/BurgerContext";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    return request('/api/ingredients')
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
  }, []);

  return (
    <BurgerContext.Provider value={{ data }}>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </BurgerContext.Provider>
  );
}

export default App;

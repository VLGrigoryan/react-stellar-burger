import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../services/reducers/ingredients";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProtectedRoute,
  IngredientPage,
} from "../../pages";
import { Switch, Route } from "react-router-dom";
import { fetchUserData } from "../../services/reducers/user";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
  const dispatch = useDispatch();
  const { isAuthCheck } = useSelector((state) => state.user);
  const data = useSelector((state) => state.ingredientDetails);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    data && (
      <>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <ProtectedRoute
            path="/profile"
            component={ProfilePage}
            isAuthCheck={isAuthCheck}
          />{" "}
          <Route
            path="/ingredient/:id"
            component={IngredientPage}
            data={data}
          />
          <Route path="/ingredient/:id" exact>
            <IngredientDetails />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;

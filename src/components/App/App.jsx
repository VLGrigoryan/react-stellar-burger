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
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { fetchUserData } from "../../services/reducers/user";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { clearIngredientDetails } from "../../services/reducers/ingredientDetails";

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const { isAuthCheck } = useSelector((state) => state.user);
  const data = useSelector((store) => store.ingredients);
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchIngredients());
   }, [dispatch]);

  const handleCloseCardModal = () => {
    closeModal();
    clearIngredientDetails();
    history.push("/");
  };
  return (
    data && (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <Route exact path="/" component={HomePage} />
          <ProtectedRoute path="/login" component={LoginPage} onlyUnAuth />
          <ProtectedRoute
            path="/register"
            component={RegisterPage}
            onlyUnAuth
          />
          <ProtectedRoute
            path="/forgot-password"
            component={ForgotPasswordPage}
            onlyUnAuth
          />
          <ProtectedRoute
            path="/reset-password"
            component={ResetPasswordPage}
            onlyUnAuth
          />
          <ProtectedRoute
            path="/profile"
            component={ProfilePage}
            isAuthCheck={isAuthCheck}
          />
          <Route path="/ingredient/:id" component={IngredientPage} />
        </Switch>
        {background && (
          <Route path="/ingredient/:id" exact>
            <Modal onClose={handleCloseCardModal} title="Детали ингредиента">
              <IngredientDetails data={data} />
            </Modal>
          </Route>
        )}
      </>
    )
  );
}

export default App;

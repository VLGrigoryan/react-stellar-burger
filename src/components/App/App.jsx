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
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { clearIngredientDetails } from "../../services/reducers/ingredientDetails";
import FeedPage from "../Feed/Feed";
import FeedOrderPage from "../FeedOrder/FeedOrder";
 
function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const data = useSelector((store) => store.ingredients);
  const background = location.state?.background;
  const backgroundFeed = location.state?.backgroundFeed;
  const order = location.state?.order;
 
  useEffect(() => {
     dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseCardModal = () => {
    closeModal();
    clearIngredientDetails();
    history.goBack();
  };

  return (
    data && (
      <>
        <AppHeader />
        <Switch location={background || backgroundFeed || location}>
          <Route exact path="/" component={HomePage} />
          <Route path="/feed" exact component={FeedPage} />
          <Route path="/feed/:id" component={FeedOrderPage} />
          <Route path="/ingredient/:id" component={IngredientPage} />
          <ProtectedRoute path="/login" onlyUnAuth component={LoginPage} />
          <ProtectedRoute
            path="/register"
            onlyUnAuth
            component={RegisterPage}
          />
          <ProtectedRoute
            path="/forgot-password"
            onlyUnAuth
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            path="/reset-password"
            onlyUnAuth
            component={ResetPasswordPage}
          />
          <Route path="/profile/orders/:id">
            <FeedOrderPage isUser/>
          </Route>
          <ProtectedRoute path="/profile" component={ProfilePage}   />
        </Switch>
        {background && (
          <Route path="/profile/orders/:id" exact>
            <Modal onClose={handleCloseCardModal} number={order}>
              <FeedOrderPage isUser/>
            </Modal>
          </Route>
        )}
        {backgroundFeed && (
          <Route path="/feed/:id" exact>
            <Modal onClose={handleCloseCardModal} number={order.number}>
              <FeedOrderPage modal={true} />
            </Modal>
          </Route>
        )}
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

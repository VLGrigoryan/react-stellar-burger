import React from "react";
import { Route, Redirect } from "react-router-dom";
 import { fetchUserData } from "../services/reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, onlyUnAuth, ...rest }) => {
  const { isAuthCheck } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, isAuthCheck]);


  return (
    <Route
      {...rest}
      render={(props) =>
        (onlyUnAuth && !isAuthCheck) || (!onlyUnAuth && isAuthCheck) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: onlyUnAuth ? "/profile" : "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

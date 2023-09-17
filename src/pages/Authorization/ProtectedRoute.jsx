import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../services/reducers/user";

const ProtectedRoute = ({ component: Component, onlyUnAuth, ...rest }) => {
  const isAuthCheck = useSelector((store) => store.user.isAuthCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (onlyUnAuth && isAuthCheck) {
          return (
            <Redirect
              to={{
                pathname: "/profile",
                state: { from: props.location },
              }}
            />
          );
        } else if (!onlyUnAuth && !isAuthCheck) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

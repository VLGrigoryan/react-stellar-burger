import React, { FC, useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { fetchUserData } from "../../services/reducers/user";
import { useSelector, useDispatch } from "../../hooks/reduxHooks";

interface ProtectedRouteProps extends RouteProps {
  onlyUnAuth?: boolean;
  component: FC<any>;
  isAuthCheck?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component, onlyUnAuth, ...rest }) => {
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

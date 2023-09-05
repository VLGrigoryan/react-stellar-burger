import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthCheck, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthCheck ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;

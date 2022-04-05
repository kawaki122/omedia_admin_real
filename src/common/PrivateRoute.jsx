import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { storageKeyEnum } from "../utils/constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(storageKeyEnum.access_token);

  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(token) ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;

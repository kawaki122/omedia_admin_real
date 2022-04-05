import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { storageKeyEnum } from "../utils/constants";

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(storageKeyEnum.access_token);

  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(token) ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

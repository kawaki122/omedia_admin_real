import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadInitial } from "../store/actions/dashActions";
import { storageKeyEnum } from "../utils/constants";
const splashStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

function Splash() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadInitial()).then((result) => {
        if (!result) {
          localStorage.removeItem(storageKeyEnum.access_token);
          history.push("/");
        }
      });
    }, 500);
  }, []);
  return (
    <div style={splashStyle}>
      <h1>Omedia</h1>
    </div>
  );
}

export default Splash;

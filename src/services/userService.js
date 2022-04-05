import axios from "axios";
import { storageKeyEnum } from "../utils/constants";
import { urlHelper } from "../utils/UrlHelper";
import { httpHeaders } from "./httpCommon";

export const login = (body) => {
  return axios.post(urlHelper.authUrl("login"), body);
};

export const updatePassword = (body) => {
  return axios.post(
    urlHelper.authUrl("updatePassword"),
    body,
    httpHeaders(localStorage.getItem(storageKeyEnum.access_token))
  );
};

export const fetchProfile = (token) => {
  return axios.get(urlHelper.userUrl("profile"), httpHeaders(token));
};

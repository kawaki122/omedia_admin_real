import axios from "axios";
import { urlHelper } from "../utils/UrlHelper";

export const login = (body) => {
  return axios.post(urlHelper.authUrl("login"), body);
};

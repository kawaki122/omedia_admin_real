import axios from "axios";
import { storageKeyEnum } from "../utils/constants";
import { urlHelper } from "../utils/UrlHelper";

export const uploadFile = (file, onProgress) => {
  const form = new FormData();
  form.append("file", file);
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };
  return axios.post(urlHelper.uploadUrl, form);
};

export const getInitial = () => {
  return axios.get(
    urlHelper.commonUrl("getInitial"),
    httpHeaders(localStorage.getItem(storageKeyEnum.access_token))
  );
};

export const httpHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

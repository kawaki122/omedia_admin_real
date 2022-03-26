import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const uploadFile = (file, onProgress) => {
    const form = new FormData();
    form.append('file', file);
    const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: event => {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      };
    return axios.post(urlHelper.uploadUrl, form)
}

export const getInitial = () => {
    return axios.get(urlHelper.commonUrl+'/getInitial')
}
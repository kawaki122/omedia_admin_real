import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const uploadFile = (file) => {
    const form = new FormData();
    form.append('file', file);
    return axios.post(urlHelper.uploadUrl, form)
}

export const getInitial = () => {
    return axios.get(urlHelper.commonUrl+'/getInitial')
}
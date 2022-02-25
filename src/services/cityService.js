import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const getCities = () => {
    return axios.get(urlHelper.cityUrl)
}

export const upsertCity = (body) => {
    return axios.patch(urlHelper.cityUrl, body)
}

export const deleteCity = (id) => {
    return axios.delete(urlHelper.cityUrl+'?id='+id)
}
import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const getBrands = () => {
    return axios.get(urlHelper.brandUrl)
}

export const addBrand = (body) => {
    return axios.post(urlHelper.brandUrl, body)
}

export const deleteBrand = (id) => {
    return axios.delete(urlHelper.brandUrl+'?id='+id)
}

export const getClients = () => {
    return axios.get(urlHelper.clientUrl)
}

export const addClient = (body) => {
    return axios.patch(urlHelper.clientUrl, body)
}

export const deleteClient = (id) => {
    return axios.delete(urlHelper.clientUrl+'?id='+id)
}
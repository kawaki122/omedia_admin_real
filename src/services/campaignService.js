import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const getCampaignes = () => {
    return axios.get(urlHelper.campaignUrl)
}

export const upsertCampaign = (body) => {
    return axios.patch(urlHelper.campaignUrl, body)
}

export const deleteCampaign = (id) => {
    return axios.delete(urlHelper.campaignUrl+'?id='+id)
}
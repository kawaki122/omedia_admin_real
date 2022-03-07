import axios from "axios"
import { urlHelper } from "../utils/UrlHelper"

export const getCampaignes = () => {
    return axios.get(urlHelper.campaignUrl)
}

export const getCampaignComplete = (id) => {
    return axios.get(urlHelper.campaignUrl+'/complete?id='+id)
}

export const upsertCampaign = (body) => {
    return axios.patch(urlHelper.campaignUrl, body)
}

export const upsertLocation = (body) => {
    return axios.patch(urlHelper.locationUrl, body)
}

export const addReview = (body) => {
    return axios.patch(urlHelper.reviewUrl, body)
}

export const deleteCampaign = (id) => {
    return axios.delete(urlHelper.campaignUrl+'?id='+id)
}
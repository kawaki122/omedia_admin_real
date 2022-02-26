import { getCities } from "../../services/cityService";

export const SET_CITIES_LOADING = 'SET_CITIES_LOADING';
export const CITIES_LOADED_SUCCESS = 'CITIES_LOADED_SUCCESS';

export const SET_BRANDS_LOADING = 'SET_BRANDS_LOADING';
export const BRANDS_LOADED_SUCCESS = 'BRANDS_LOADED_SUCCESS';

export const SET_CLIENTS_LOADING = 'SET_CLIENTS_LOADING';
export const CLIENTS_LOADED_SUCCESS = 'CLIENTS_LOADED_SUCCESS';

export const loadCities = () => dispatch => {
    dispatch({type: SET_CITIES_LOADING, payload: true})

    getCities().then(data => {
        dispatch({type: CITIES_LOADED_SUCCESS, payload: data.data})
    }).catch(e => {
        dispatch({type: SET_CITIES_LOADING, payload: true})
    })
}
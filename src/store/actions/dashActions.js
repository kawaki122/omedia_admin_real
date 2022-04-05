import { getBrands, getClients } from "../../services/brandService";
import { getCities } from "../../services/cityService";
import { getInitial } from "../../services/httpCommon";
import {
  setBrandsLoading,
  setBrandsSuccess,
  setCitiesLoading,
  setCitiesSuccess,
  setClientsLoading,
  setClientsSuccess,
  setInitialLoaded,
} from "../reducers/dashSlice";

export const loadInitial = () => (dispatch) => {
  return getInitial()
    .then((data) => {
      const { cities, brands, clients, user } = data.data;
      dispatch(setInitialLoaded({ cities, brands, clients, user }));
      return true;
    })
    .catch((e) => {
      console.log(e);
      dispatch(
        setInitialLoaded({ cities: [], brands: [], clients: [], user: null })
      );
      return false;
    });
};

export const loadCities = () => (dispatch) => {
  dispatch(setCitiesLoading(true));

  getCities()
    .then((data) => {
      dispatch(setCitiesSuccess(data.data));
    })
    .catch((e) => {
      dispatch(setCitiesLoading(false));
    });
};

export const loadBrands = () => (dispatch) => {
  dispatch(setBrandsLoading(true));

  getBrands()
    .then((data) => {
      dispatch(setBrandsSuccess(data.data));
    })
    .catch((e) => {
      dispatch(setBrandsLoading(false));
    });
};

export const loadClients = () => (dispatch) => {
  dispatch(setClientsLoading(true));

  getClients()
    .then((data) => {
      dispatch(setClientsSuccess(data.data));
    })
    .catch((e) => {
      dispatch(setClientsLoading(false));
    });
};

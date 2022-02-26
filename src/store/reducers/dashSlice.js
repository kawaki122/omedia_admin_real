import { SET_CITIES_LOADING } from "../actions/dashActions"
import { createSlice } from "./createSlice"

const initial = {
    city: {
        data: [],
        loaing: false,
    },
    brand: {
        data: [],
        loaing: false,
    },
    client: {
        data: [],
        loaing: false,
    },
}

export default createSlice({
    initState: initial,
    reducers: {
        SET_CITIES_LOADING: (state, action) => {
            state.city.loading = action.payload;
        }
    }
})

import { SET_CAMP_LOADING, SET_INITIAL_CAMP_DATA } from "../actions/campActions";

export const initialCampState = {
    campaign: null,
    locations: [],
    loading: true,
    
}

function campReducer(state = initialCampState, action) {
    switch (action.type) {
        case SET_INITIAL_CAMP_DATA:
            const { campaign, locations } = action.payload
            return { ...state, campaign, locations, loading: false }
        case SET_CAMP_LOADING:
            return { ...state, loading: action.payload }
        default:
            return { ...state }
    }
}

export default campReducer
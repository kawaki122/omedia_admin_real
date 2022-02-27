
const initial = {
    city: {
        data: [],
        loading: false,
    },
    brand: {
        data: [],
        loading: false,
    },
    client: {
        data: [],
        loading: false,
    },
}

export default (state = initial, action) => {
    if (action.type === 'setCitiesLoading') {
        const cityNew = { ...state.city };
        cityNew.loading = action.payload;
        return {
            ...state,
            city: cityNew,
        }
    } else if (action.type === 'setCitiesSuccess') {
        const cityNew = { ...state.city };
        cityNew.data = action.payload;
        cityNew.loading = false;
        return {
            ...state,
            city: cityNew,
        }
    } else if (action.type === 'setBrandsLoading') {
        const brandNew = { ...state.brand };
        brandNew.loading = action.payload;
        return {
            ...state,
            brand: brandNew,
        }
    } else if (action.type === 'setBrandsSuccess') {
        const brandNew = { ...state.brand };
        brandNew.data = action.payload;
        brandNew.loading = false;
        return {
            ...state,
            brand: brandNew,
        }
    } else if (action.type === 'setClientsLoading') {
        const clientNew = { ...state.client };
        clientNew.loading = action.payload;
        return {
            ...state,
            client: clientNew,
        }
    } else if (action.type === 'setClientsSuccess') {
        const clientNew = { ...state.client };
        clientNew.data = action.payload;
        clientNew.loading = false;
        return {
            ...state,
            client: clientNew,
        }
    } else {
        return state
    }
}

export const {
    setCitiesLoading,
    setCitiesSuccess,
    setBrandsLoading,
    setBrandsSuccess,
    setClientsLoading,
    setClientsSuccess,
} = {
    setCitiesLoading: (payload) => ({ type: 'setCitiesLoading', payload }),
    setCitiesSuccess: (payload) => ({ type: 'setCitiesSuccess', payload }),
    setBrandsLoading: (payload) => ({ type: 'setBrandsLoading', payload }),
    setBrandsSuccess: (payload) => ({ type: 'setBrandsSuccess', payload }),
    setClientsLoading: (payload) => ({ type: 'setClientsLoading', payload }),
    setClientsSuccess: (payload) => ({ type: 'setClientsSuccess', payload }),
}

// const dashSlice = createSlice({
//     initState: initial,
//     reducers: {
//         setCitiesLoading: (state, action) => {
//             state.city.loading = action.payload;
//             return state;
//         },
//         setCitiesSuccess: (state, action) => {
//             state.city.data = action.payload;
//             state.city.loading = false;
//             return state;
//         }
//     }
// })

// export const { setCitiesLoading, setCitiesSuccess } = dashSlice.actions;
// export default dashSlice.reducer;
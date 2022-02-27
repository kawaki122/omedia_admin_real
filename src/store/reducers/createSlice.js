
export const createSlice = ({ reducers, initState }) => {
    const names = Object.keys(reducers)
    const actions = {}
    names.forEach((item) => {
        actions[item] = (payload) => ({
            type: item,
            payload,
        })
    })
    return {
        reducer: (state = initState, action) => {
            const actionFunction = reducers[action.type]
            if (actionFunction) {
                return actionFunction({...state}, action)
            }
            return state
        },
        actions,
    }
}
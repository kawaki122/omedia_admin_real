
export const createSlice = ({reducers, initState}) => (state=initState, action) => {
    const actionFunction = reducers[action.type]
    if(actionFunction) {
        return actionFunction(...state, action)
    }
    return state
}
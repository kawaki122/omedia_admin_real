const initial = {
    splash: true,
}

export default (state = initial, action) => {
    if (action.type === 'setSplashVisible') {
        return {
            ...state,
            splash: action.payload,
        }
    } else {
        return state
    }
}

export const {
    setSplashVisible,
} = {
    setSplashVisible: (payload) => ({ type: 'setSplashVisible', payload }),
}
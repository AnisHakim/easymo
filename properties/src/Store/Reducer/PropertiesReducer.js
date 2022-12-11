const initiaState = {
    id: null,
    numberOfSubmit: 0
}
const PropertiesReducer = (state = initiaState, action) => {
    switch (action.type) {
        case "SAVE_ID":
            return { ...state, id: action.payload }
        case "INCREMENT_NUMBER":
            return { ...state, numberOfSubmit: state.numberOfSubmit + 1 }
        case "DEINCREMENT_NUMBER":
            return { ...state, numberOfSubmit: state.numberOfSubmit - 1 }
        case "RESET_NUMBER":
            return { ...state, numberOfSubmit: 0 }
        default:
            break;
    }
    return state
}

export default PropertiesReducer
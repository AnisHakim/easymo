const initialState = {
    mail: ""
}

function LoginReduce(state = initialState, { type, payload }) {
    switch (type) {
        case "SAVE_MAIL":
            return {
                ...state,
                mail: payload.mail,
            };
        case "RESET_MAIL":
            return initialState
        default:
            return state;
    }
}

export default LoginReduce
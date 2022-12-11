import PubSub from "pubsub-js";
const publish = (event, data) => PubSub.publish(event, data)
const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    lastConnect: null
}

function AuthReduce(state = initialState, { type, payload }) {
    switch (type) {
        case "SAVE_USER":
            const data = {
                ...state,
                user: payload.user,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                lastConnect: Date.now()
            }
            publish("SAVE_USER", data)
            publish("SET_LAST_CONNECT", Date.now())
            return data
        case "SET_TOKEN":
            publish("SET_LAST_CONNECT", Date.now())
            return {
                ...state,
                ...payload,
                lastConnect: Date.now()
            }
        case "RESET_TOKEN":
            return initialState
        case "SET_PERPAGE":
            return {
                ...state,
                user: {
                    ...state.user,
                    setting: {
                        ...state.user.setting,
                        listPropertiesPerPage: payload
                    }
                }
            }
        default:
            return state;
    }
}

export default AuthReduce
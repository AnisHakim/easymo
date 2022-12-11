import PubSub from "pubsub-js";
const publish = (event, data) => PubSub.publish(event, data)
const initialState = false

function SideBarReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "SET_SIDE_BAR":
            publish("SET_SIDE_BAR", payload)
            return payload
        default:
            return state;
    }
}

export default SideBarReducer
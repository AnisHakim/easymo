import PubSub from "pubsub-js";
const publish = (event, data) => PubSub.publish(event, data)

const SideBarReducer = (state = true, action) => {
    if (action.type === "SET_SIDE_BAR") {
        publish("SET_SIDE_BAR", action.payload)
        return action.payload
    }
    return state
}

export default SideBarReducer
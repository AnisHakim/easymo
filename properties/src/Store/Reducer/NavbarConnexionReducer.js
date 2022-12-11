const initialState = {
    showInfo: false
}
const NavbarConnexionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_SHOW_INFO":
            return {
                ...state,
                showInfo: payload
            }
        default:
            return state;
    }
}
export default NavbarConnexionReducer
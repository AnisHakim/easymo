const initiaState = {
    listAgent: [],
    listBuyer: [],
    listTenant: [],
    listOwner: [],
    listAgentUser: [],
}
const contactReducer = (state = initiaState, { type, payload }) => {
    switch (type) {
        case 'SET_CONTACTS':
            return {
                ...state,
                listAgent: payload.listAgent,
                listBuyer: payload.listBuyer,
                listTenant: payload.listTenant,
                listOwner: payload.listOwner,
            }
        case 'ADD_CONTACT':
            if (payload.serviceProvider) {
                return {
                    ...state,
                    listAgent: [...state.listAgent, payload],
                }
            } else {

                if (payload.clientSubCategory === "buyer") {
                    return {
                        ...state,
                        listBuyer: [...state.listBuyer, payload],
                    }
                }
                else if (payload.clientSubCategory === "tenant") {
                    return {
                        ...state,
                        listTenant: [...state.listTenant, payload],
                    }
                } else {
                    return {
                        ...state,
                        listOwner: [...state.listOwner, payload],
                    }
                }
            }

        case 'SET_AGENTS':
            return {
                ...state,
                listAgentUser: payload
            }
        case 'CLEAR_CONTACTS':
            return initiaState
        default:
            return state;

    }
}
export default contactReducer
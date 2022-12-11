import { apiPost } from "../standardApi"
const lang = 'fr'
const apiAddContact = async (body) => {
    return await apiPost("/api/" + lang + "/contact/add", body)
}
export {
    apiAddContact
}
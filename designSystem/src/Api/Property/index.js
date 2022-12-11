import { apiGet, apiGetFile } from "../standardApi";
const lang = 'fr'
export const apiGetPropertyNumber = async () => {
    return await apiGet("/api/" + lang + "/properties/numberProperties")
}

export const apiGetFileById = async (id) => {
    return await apiGetFile("/api/" + lang + "/file/getDocument/" + id)
}
export const apiGetImage = async (id) => {
    return await apiGetFile("/api/" + lang + "/file/getImage/" + id)
}
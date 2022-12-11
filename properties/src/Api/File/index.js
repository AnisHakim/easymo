import { apiGetFile as getFile } from "@easymo/designSystem"
const lang = 'fr'
const apiGetFile = async (id) => {
    return await getFile("/api/" + lang + "/file/getImage/" + id)
}
const apiGetFileById = async (id) => {
    return await getFile("/api/" + lang + "/file/getDocument/" + id)
}
export {
    apiGetFile,
    apiGetFileById
}
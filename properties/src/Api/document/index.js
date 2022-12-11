import { apiGet, apiPost, apiPut, apiDelete, apiGetFile, apiUploadFile as uploadFile } from "@easymo/designSystem"

const lang = 'fr'
const apiUploadFile = async (data, options) => {
    return await uploadFile("/api/" + lang + "/document/createDocument", data, options)
}
const apiCreateFolder = async (body) => {
    return await apiPost("/api/" + lang + "/document/createFolder", body)
}
const apiUpdateFolder = async (body) => {
    return await apiPut("/api/" + lang + "/document/updateFolder", body)
}
const apiDeleteFolder = async (id) => {
    return await apiDelete("/api/" + lang + `/document/deleteFolder/${id}`)
}
const apiListDocument = async () => {
    return await apiGet("/api/" + lang + `/document/listDocument/`)
}
const apiDeleteFile = async (id) => {
    return await apiDelete("/api/" + lang + `/document/deleteDocument/${id}`)
}
const apiRenameFile = async (body) => {
    return await apiPut("/api/" + lang + "/document/renameDocument", body)
}
const apiUpdateFile = async (body) => {
    return await apiPut("/api/" + lang + "/document/updateDocument", body)
}
const apiUpdatePublicFile = async (body) => {
    return await apiPut("/api/" + lang + "/document/updatePublicDocument", body)
}
const apiDownloadFolder = async (id) => {
    return await apiGetFile("/api/" + lang + `/document/downloadfolder?folderId=${id}`)
}
const apiArchiveUpdateFiles = async (body) => {
    return await apiPut("/api/" + lang + '/document/updateStatus', body)
}
const apiSearchDocument = async (id, word) => {
    return await apiGet("/api/" + lang + `/document/listDocument?propertieId=${id}&searchWord=${word}`)
}
const apiMoveDocument = async (body) => {
    return await apiPut("/api/" + lang + `/document/moveDocument`, body)
}
const apiShareFile = async (body) => {
    return await apiPost("/api/" + lang + "/document/shareFile", body)
}
const apiShareFolder = async (body) => {
    return await apiPost("/api/" + lang + "/document/shareFolder", body)
}
export {
    apiShareFolder,
    apiShareFile,
    apiMoveDocument,
    apiUploadFile,
    apiSearchDocument,
    apiArchiveUpdateFiles,
    apiDownloadFolder,
    apiUpdatePublicFile,
    apiRenameFile,
    apiUpdateFile,
    apiDeleteFile,
    apiListDocument,
    apiDeleteFolder,
    apiUpdateFolder,
    apiCreateFolder,
}
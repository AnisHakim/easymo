import { apiGet, apiPost, apiPut, apiGetFile, apiGetPostFile } from "@easymo/designSystem"
const lang = 'fr'
const apiListProperties = async (query) => {
    let url = '/api/' + lang + '/properties/listsearchproperties?'
    Object.keys(query).forEach(el => {
        if (query[el] && Array.isArray(query[el]) && query[el].join('')) {
            url += el + '=' + query[el] + "&"
        } else if (query[el] && !Array.isArray(query[el]) && query[el] !== "") {
            url += el + '=' + query[el] + "&"
        }
    })
    return await apiGet(url)
}

const apiDuplicatePropperties = async (body) => {
    return await apiPost("/api/" + lang + "/properties/duplicate", body)
}
const apiDeletePropperties = async (body) => {
    return await apiPost("/api/" + lang + "/properties/delete", body)
}
const apiArchivePropperties = async (body) => {
    return await apiPost("/api/" + lang + "/properties/archive", body)
}
const apiMonthstatistic = async () => {
    return await apiGet("/api/" + lang + "/properties/month-statistic")
}
const apiCreateProperty = async (body) => {
    return await apiPost("/api/" + lang + "/properties/create", body)
}
const apiListContacts = async (query) => {
    return await apiGet("/api/" + lang + "/contact/listContact")
}
const apiUpdateIdentification = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateidentification", body)
}
const apiUpdateIntervenant = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateIntervanant", body)
}
const apiGetPropertieById = async (id) => {
    return await apiGet("/api/" + lang + "/properties/getPropertieById/" + id)
}
const apiUpdateOccupation = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateOccupation", body)
}

const apiUpdateMandat = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateMandat", body)
}
const apiUpdateTransaction = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateTransaction", body, 'form-data')
}
const apiUpdateDescription = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateBuilding", body)
}
const apiUpdateAdministratif = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateAdministratif ", body, 'form-data')
}
const apiListEquipements = async () => {
    return await apiGet("/api/" + lang + "/properties/getListEquipment")
}
const apiListEquipementCategory = async () => {
    return await apiGet("/api/" + lang + "/properties/getListEquipementCategory")
}
const apiCreateEquipment = async (body) => {
    return await apiPost("/api/" + lang + "/properties/createEquipment", body)
}
const apiUpdateEquipment = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateEquipment", body)
}
const apiGetOffre = async (id) => {
    return await apiGet("/api/" + lang + `/properties/getListOffre/${id}`)
}
const apiUpdateStatus = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateStatus", body, 'form-data')
}
const apiUpdateMedia = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateMedia", body)
}
const apiUpdateVisit = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateVisit", body)
}
const apiUpdateComposition = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateComposition", body)
}
const apiUpdateAffichage = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateDisplay", body)
}
const apiUpdateProximity = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateProximity", body)
}
const apiUpdateDiffusion = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateDiffusion", body)
}
const apiUpdateRating = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateRating", body)
}
const apiUpdateGeneralInfo = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateGeneralInfo", body)
}
const apiUpdateImg = async (body) => {
    return await apiPut("/api/" + lang + "/properties/updateImg", body, 'form-data')
}
const apiExportProperties = async (body) => {
    const url = "/api/" + lang + `/properties/exportProperties`
    return await apiGetPostFile(url, body)
}

const apiGetPriceHistoricById = async (id) => {
    return await apiGet("/api/" + lang + "/properties/getPriceHistoricById/" + id)
}
const apiFileRequest = async (body) => {
    return await apiPost("/api/" + lang + "/properties/fileRequest", body)
}
const apiGetActivityHistoric = async (id, page, perpage) => {
    return await apiGet("/api/" + lang + "/properties/getActivityHistoric?page=" + page + "&perPage=" + perpage + "&propertieId=" + id)
}
const apiGetHistoricModification = async (id) => {
    return await apiGet("/api/" + lang + "/properties/getModifyHistoric?propertieId=" + id)
}

export {
    apiGetHistoricModification,
    apiListProperties,
    apiDuplicatePropperties,
    apiArchivePropperties,
    apiDeletePropperties,
    apiMonthstatistic,
    apiCreateProperty,
    apiListContacts,
    apiUpdateIdentification,
    apiUpdateIntervenant,
    apiGetPropertieById,
    apiUpdateOccupation,
    apiUpdateMandat,
    apiUpdateTransaction,
    apiUpdateDescription,
    apiUpdateAdministratif,
    apiListEquipements,
    apiListEquipementCategory,
    apiCreateEquipment,
    apiUpdateEquipment,
    apiGetOffre,
    apiUpdateStatus,
    apiUpdateMedia,
    apiUpdateComposition,
    apiUpdateAffichage,
    apiUpdateVisit,
    apiUpdateProximity,
    apiUpdateDiffusion,
    apiUpdateRating,
    apiUpdateGeneralInfo,
    apiUpdateImg,
    apiExportProperties,
    apiGetPriceHistoricById,
    apiFileRequest,
    apiGetActivityHistoric
}
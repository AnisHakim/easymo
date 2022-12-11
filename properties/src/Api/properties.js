import { apiGet } from "@easymo/designSystem"
const lang = 'fr'
const apiListProperties = async (query) => {
    let url = '/api/' + lang + '/properties/listsearchproperties?'
    Object.keys(query).forEach(el => {
        if (query[el] && Array.isArray(query[el]) && query[el].join('')) {
            url += el + '=' + query[el] + "&"
        } else if (query[el] && !Array.isArray(query[el]) && query[el] !== "") {
            url += el + '=' + query[el] + "&"
        }
    }
    )
    return await apiGet(url)
}
export {
    apiListProperties
}

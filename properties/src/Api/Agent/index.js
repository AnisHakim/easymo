import { apiGet } from "@easymo/designSystem"
const lang = 'fr'

const getAgentList = async () => {
    const url = '/api/' + lang + '/contact/listAgent'
    return await apiGet(url)
}
export {
    getAgentList
}

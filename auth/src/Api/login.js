import { apiURL } from "@easymo/designSystem";
const lang = 'fr'

export const apiLogin = async (body) => {
    const response = await fetch(`${apiURL}/api/${lang}/auth/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    return response.json()
}
import { apiURL } from "@easymo/designSystem";
const lang = 'fr'
export const apiDoubleAuth = async (body) => {
    const response = await fetch(`${apiURL}/api/${lang}/Auth/code-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    return response.json()
}
export const apiResendCode = async (body) => {
    const response = await fetch(`${apiURL}/api/${lang}/Auth/sendCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    return response.json()
}

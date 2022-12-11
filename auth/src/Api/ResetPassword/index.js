import { apiURL } from "@easymo/designSystem";
const lang = 'fr'

export async function verifTokenPswd(token) {
    const response = await fetch(`${apiURL}/api/${lang}/Auth/verif-token-password/${token}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        }
    });
    return response.json();
}
export async function forgetPassword(token, password) {
    const response = await fetch(`${apiURL}/api/${lang}/Auth/resetPassword`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            token: token,
            password: password
        })
    });
    return response.json();
}
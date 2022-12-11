import { apiURL } from "@easymo/designSystem";
const lang = 'fr'

export async function signup(body) {
    const response = await fetch(`${apiURL}/api/${lang}/Agence/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        body: body
    });
    return response.json();
}

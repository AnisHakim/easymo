import { apiURL } from "@easymo/designSystem";
const lang = 'fr'

export async function forgetPassword(email) {
    const response = await fetch(`${apiURL}/api/${lang}/Auth/forgetPassword`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            mail: email,
        })
    });
    return response.json();
}

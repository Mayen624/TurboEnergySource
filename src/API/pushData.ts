import {getApiUrl} from '@utils/utils.ts'

export const addUser = async (data: object, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/users/new_user`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Agrega el Content-Type
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);

    }
}

export const enabledOrDisabled = async (id: string, enabled: boolean, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/users/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);

    }
}
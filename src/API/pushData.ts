import {getApiUrl} from '@utils/utils.ts'

//======================== Users ======================== //

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

export const enabledOrDisabledUser = async (id: string, enabled: boolean, token: string) => {
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

//======================== Actions ======================== //

export const addAction = async (data: object, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/actions/new_action`, {
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

export const enabledOrDisabledAction = async (id: string, enabled: boolean, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/actions/enabledOrDesabled/${id}`, {
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

//======================== Roles ======================== //

export const addRole = async (data: object, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/roles/new_role`, {
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

export const enabledOrDisabledRole = async (id: string, enabled: boolean, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/roles/enabledOrDesabled/${id}`, {
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
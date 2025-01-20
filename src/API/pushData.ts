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
                'Content-Type': 'application/json',
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

//======================== Contact ======================== //
export const sendContactForm = async (data: object) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/contacts/new_contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

//======================== Products ======================== //
export const addProduct = async (data: object, img: File, token: string) => {
    try {

        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));
        formData.append('token', token);

        const response = await fetch(`${getApiUrl()}/v1/products/new_product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const enabledOrDisabledProduct = async (id: string, enabled: boolean, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/products/enabledOrDesabled/${id}`, {
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
        console.log(error)
        console.error('Error en la solicitud:', error);

    }
}
//======================== Services ======================== //
export const addService = async (data: object, img: File, token: string) => {
    try {

        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));
        formData.append('token', token);

        const response = await fetch(`${getApiUrl()}/v1/services/new_service`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const enabledOrDisabledService = async (id: string, enabled: boolean, token: string) => {
    try {

        const response = await fetch(`${getApiUrl()}/v1/service/enabledOrDesabled/${id}`, {
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
        console.log(error)
        console.error('Error en la solicitud:', error);

    }
}
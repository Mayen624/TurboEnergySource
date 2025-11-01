import {getApiUrl} from '@utils/utils.ts'

// Función auxiliar para obtener CSRF token
const getCsrfToken = (): string | null => {
    return localStorage.getItem('csrfToken');
};

//======================== Users ======================== //

export const addUser = async (data: object) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/users/new_user`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledUser = async (id: string, enabled: boolean) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/users/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

//======================== Actions ======================== //

export const addAction = async (data: object) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/actions/new_action`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledAction = async (id: string, enabled: boolean) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/actions/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

//======================== Roles ======================== //

export const addRole = async (data: object) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/roles/new_role`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledRole = async (id: string, enabled: boolean) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/roles/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
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
export const addProduct = async (data: object, img: File) => {
    try {
        const csrfToken = getCsrfToken();

        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));

        const response = await fetch(`${getApiUrl()}/v1/products/new_product`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const enabledOrDisabledProduct = async (id: string, enabled: boolean) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/products/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.log(error)
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

//======================== Services ======================== //
export const addService = async (data: object, img: File) => {
    try {
        const csrfToken = getCsrfToken();

        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));

        const response = await fetch(`${getApiUrl()}/v1/services/new_service`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const enabledOrDisabledService = async (id: string, enabled: boolean) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/service/enabledOrDesabled/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({enabled: enabled})
        });

        const res = await response.json();
        return res;

    } catch (error) {
        console.log(error)
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}
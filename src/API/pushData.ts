import { apiPost, apiPut, apiFetch } from '@/utils/api';
import { getApiUrl } from '@/utils/utils';

//======================== Users ======================== //

export const addUser = async (data: object) => {
    try {
        const response = await apiPost('/v1/users/new_user', data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const updateUser = async (id: string, data: object) => {
    try {
        const response = await apiPut(`/v1/users/${id}`, data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledUser = async (id: string, enabled: boolean) => {
    try {
        const response = await apiPut(`/v1/users/enabledOrDesabled/${id}`, {enabled: enabled});
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
        const response = await apiPost('/v1/actions/new_action', data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const updateAction = async (id: string, data: object) => {
    try {
        const response = await apiPut(`/v1/actions/${id}`, data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledAction = async (id: string, enabled: boolean) => {
    try {
        const response = await apiPut(`/v1/actions/enabledOrDesabled/${id}`, {enabled: enabled});
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
        const response = await apiPost('/v1/roles/new_role', data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const updateRole = async (id: string, data: object) => {
    try {
        const response = await apiPut(`/v1/roles/${id}`, data);
        const res = await response.json();
        return res;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}

export const enabledOrDisabledRole = async (id: string, enabled: boolean) => {
    try {
        const response = await apiPut(`/v1/roles/enabledOrDesabled/${id}`, {enabled: enabled});
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

export const updateContactStatus = async (id: string, status: string) => {
    try {
        const response = await apiPut(`/v1/contacts/update_status/${id}`, { status });
        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const addContactNote = async (id: string, noteData: { content: string, createdBy?: string }) => {
    try {
        const response = await apiPost(`/v1/contacts/add_note/${id}`, noteData);
        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const sendClientEmail = async (emailData: {
    to: string,
    toName: string,
    subject: string,
    message: string,
    contactId?: string
}) => {
    try {
        const response = await apiPost('/v1/contacts/send_email', emailData);
        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

//======================== Products ======================== //
export const addProduct = async (data: object, img: File) => {
    try {
        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));

        const csrfToken = localStorage.getItem('csrfToken');
        const response = await apiFetch('/v1/products/new_product', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const updateProduct = async (id: string, data: object, img?: File) => {
    try {
        const formData = new FormData();
        if (img) {
            formData.append('img', img);
        }
        formData.append('product', JSON.stringify(data));

        const csrfToken = localStorage.getItem('csrfToken');
        const response = await apiFetch(`/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
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
        const response = await apiPut(`/v1/products/enabledOrDesabled/${id}`, {enabled: enabled});
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
        const formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(data));

        const csrfToken = localStorage.getItem('csrfToken');
        const response = await apiFetch('/v1/services/new_service', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            body: formData
        });

        const res = await response.json();
        return res;

    } catch (e) {
        return {error: e};
    }
}

export const updateService = async (id: string, data: object, img?: File) => {
    try {
        const formData = new FormData();
        if (img) {
            formData.append('img', img);
        }
        formData.append('product', JSON.stringify(data));

        const csrfToken = localStorage.getItem('csrfToken');
        const response = await apiFetch(`/v1/services/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
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
        const response = await apiPut(`/v1/service/enabledOrDesabled/${id}`, {enabled: enabled});
        const res = await response.json();
        return res;

    } catch (error) {
        console.log(error)
        console.error('Error en la solicitud:', error);
        return { error: error };
    }
}
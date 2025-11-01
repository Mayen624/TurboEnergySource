import { getApiUrl } from "@/utils/utils";

// Función auxiliar para obtener CSRF token
const getCsrfToken = (): string | null => {
    return localStorage.getItem('csrfToken');
};

//======================== Users ======================== //
export const getUsers = async () => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/users`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include', // Envía cookies httpOnly automáticamente
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching users' : data.error };
        }

        return data.users;

    } catch (error) {
        console.error('Error fetching users:', error);
        return { error: error };
    }
};

//======================== Actions ======================== //

export const getActions = async (page: number = 1, limit: number = 10) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/actions?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching actions' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching actions:', error);
        return { error: error };
    }
};

//======================== Roles ======================== //

export const getRoles = async (page: number = 1, limit: number = 10) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/roles?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching roles' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching roles:', error);
        return { error: error };
    }
};

//======================== Products ======================== //

export const getProducts = async (page: number = 1, limit: number = 10) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/products?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching products' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: error };
    }
};

//======================== Contact ======================== //

export const getContacts = async () => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/contacts`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            console.log(data.error);
            return { error: data.error == undefined || null ? 'Error fetching contact' : data.error };
        }

        return data.contacts;

    } catch (error) {
        console.error('Error fetching contact:', error);
        return { error: error };
    }
};

//======================== Services ======================== //

export const getServices = async (page: number = 1, limit: number = 10) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${getApiUrl()}/v1/services?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching services' : data.error };
        }

        return data.services;

    } catch (error) {
        console.error('Error fetching services:', error);
        return { error: error };
    }
};

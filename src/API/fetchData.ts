import { getApiUrl } from "@/utils/utils";

//======================== Users ======================== //
export const getUsers = async (token: string) => {
    try {
        
        const response = await fetch(`${getApiUrl()}/v1/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export const getActions = async (token: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/actions?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export const getRoles = async (token: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/roles?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export const getProducts = async (token: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/products?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export const getContacts = async (token: string) => {
    try {
        
        const response = await fetch(`${getApiUrl()}/v1/contacts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export const getServices = async (token: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/services?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

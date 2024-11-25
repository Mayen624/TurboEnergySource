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

export const getActions = async (token: string) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/actions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching actions' : data.error }; 
        }

        return data.actions;

    } catch (error) {
        console.error('Error fetching actions:', error);
        return { error: error }; 
    }
};

//======================== Roles ======================== //

export const getRoles = async (token: string) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/roles`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching roles' : data.error }; 
        }

        return data.roles;

    } catch (error) {
        console.error('Error fetching roles:', error);
        return { error: error }; 
    }
};

//======================== Products ======================== //

export const getProducts = async (token: string) => {
    try {
        const response = await fetch(`${getApiUrl()}/v1/products`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching products' : data.error }; 
        }

        return data.products;

    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: error }; 
    }
};


import { apiGet } from "@/utils/api";

//======================== Users ======================== //
export const getUsers = async () => {
    try {
        const response = await apiGet('/v1/users');
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
        const response = await apiGet(`/v1/actions?page=${page}&limit=${limit}`);
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

export const getAllActions = async () => {
    try {
        const response = await apiGet('/v1/actions/all');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching actions' : data.error };
        }

        return data.actions;

    } catch (error) {
        console.error('Error fetching all actions:', error);
        return { error: error };
    }
};

//======================== Roles ======================== //

export const getRoles = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiGet(`/v1/roles?page=${page}&limit=${limit}`);
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
        const response = await apiGet(`/v1/products?page=${page}&limit=${limit}`);
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

// Public endpoint for landing page - no authentication required
export const getPublicProducts = async (page: number = 1, limit: number = 100) => {
    try {
        const response = await apiGet(`/v1/products/public?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching products' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching public products:', error);
        return { error: error };
    }
};

//======================== Contact ======================== //

export const getContacts = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiGet(`/v1/contacts?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            console.log(data.error);
            return { error: data.error == undefined || null ? 'Error fetching contact' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching contact:', error);
        return { error: error };
    }
};

export const getContactById = async (id: string) => {
    try {
        const response = await apiGet(`/v1/contacts/${id}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error || 'Error fetching contact details' };
        }

        return data;

    } catch (error) {
        console.error('Error fetching contact details:', error);
        return { error: error };
    }
};

export const getContactStats = async () => {
    try {
        const response = await apiGet('/v1/contacts/stats');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error || 'Error fetching contact stats' };
        }

        return data.stats;

    } catch (error) {
        console.error('Error fetching contact stats:', error);
        return { error: error };
    }
};

export const getApprovedContacts = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiGet(`/v1/contacts/approved?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            console.log(data.error);
            return { error: data.error == undefined || null ? 'Error fetching approved contacts' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching approved contacts:', error);
        return { error: error };
    }
};

//======================== Services ======================== //

export const getServices = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiGet(`/v1/services?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching services' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching services:', error);
        return { error: error };
    }
};

// Public endpoint for landing page - no authentication required
export const getPublicServices = async (page: number = 1, limit: number = 100) => {
    try {
        const response = await apiGet(`/v1/services/public?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching services' : data.error };
        }

        return data;

    } catch (error) {
        console.error('Error fetching public services:', error);
        return { error: error };
    }
};

//======================== Settings ======================== //

// Get settings (authenticated - for admin panel)
export const getSettings = async () => {
    try {
        const response = await apiGet('/v1/settings');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching settings' : data.error };
        }

        return data.settings;

    } catch (error) {
        console.error('Error fetching settings:', error);
        return { error: error };
    }
};

// Get public settings (no auth - for landing page visibility)
export const getPublicSettings = async () => {
    try {
        const response = await apiGet('/v1/settings/public');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching public settings' : data.error };
        }

        return data.settings;

    } catch (error) {
        console.error('Error fetching public settings:', error);
        return { error: error };
    }
};

//======================== Contact Page ======================== //

// Get contact page content (authenticated - for admin panel)
export const getContactPage = async () => {
    try {
        const response = await apiGet('/v1/contact-page');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching contact page' : data.error };
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching contact page:', error);
        return { error: error };
    }
};

// Get public contact page content (no auth - for landing page)
export const getPublicContactPage = async () => {
    try {
        const response = await apiGet('/v1/contact-page/public');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching contact page' : data.error };
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching public contact page:', error);
        return { error: error };
    }
};

//======================== About Page ======================== //

// Get about page content (authenticated - for admin panel)
export const getAboutPage = async () => {
    try {
        const response = await apiGet('/v1/about-page');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching about page' : data.error };
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching about page:', error);
        return { error: error };
    }
};

// Get public about page content (no auth - for landing page)
export const getPublicAboutPage = async () => {
    try {
        const response = await apiGet('/v1/about-page/public');
        const data = await response.json();

        if (!response.ok || data.error) {
            return { error: data.error == undefined || null ? 'Error fetching about page' : data.error };
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching public about page:', error);
        return { error: error };
    }
};

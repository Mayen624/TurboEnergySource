
//======================== Users ======================== //
export const getUsers = async (token: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/users', {
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


//======================== Roles ======================== //

export const getRoles = async (token: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/roles', {
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

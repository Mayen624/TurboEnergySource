

export const addUser = async (data: object, token: string) => {
    try {

        const response = await fetch('http://localhost:3000/api/v1/users/new_user', {
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
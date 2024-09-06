import {successToast, errorToast} from "@utils/notify.ts";

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if(data.error){
            return errorToast('¡Error!', data.error);
        }

        if (data.token) {
            document.cookie = `authToken=${data.token}; path=/; max-age=3600; SameSite=Strict; Secure`;
            return window.location.href = '/admin?message=authorized';
        } else {
            throw new Error('Token no recibido');
        }
    } catch (error) {
        if (error instanceof Error) {
            return errorToast('¡Error!', error.message);
        } else {
            return errorToast('¡Error!', 'Ocurrió un error desconocido.');
        }
    }
};
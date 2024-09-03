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
            // Almacena el token en localStorage o sessionStorage
            //localStorage.setItem('authToken', data.token);
            document.cookie = `authToken=${data.token}; path=/; max-age=3600; SameSite=Strict; Secure`;
            console.log('Cookie set:', document.cookie);
            successToast('¡Exito!', data.success);

            // Redirigir al dashboard o actualizar la UI
            return window.location.href = '/admin';
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
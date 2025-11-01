import {successToast, errorToast} from "@utils/notify.ts";
import { getApiUrl } from "@/utils/utils";

export const handleLogin = async (email: string, password: string) => {

    try {
        const response = await fetch(`${getApiUrl()}/v1/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Importante: permite recibir cookies del servidor
        });

        const data = await response.json();

        if(data.error){
            return errorToast('¡Error!', data.error);
        }

        // El servidor ahora envía las cookies httpOnly automáticamente
        // Ya no necesitamos establecer la cookie manualmente
        if (data.success && data.csrfToken) {
            // Guardar CSRF token en localStorage para usarlo en requests
            localStorage.setItem('csrfToken', data.csrfToken);

            successToast('¡Éxito!', `Bienvenido ${data.user.name}`);

            // Redirigir al dashboard
            return window.location.href = '/admin?message=authorized';
        } else {
            throw new Error('Respuesta de autenticación inválida');
        }
    } catch (error) {
        if (error instanceof Error) {
            return errorToast('¡Error!', error.message);
        } else {
            return errorToast('¡Error!', 'Ocurrió un error desconocido.');
        }
    }
};
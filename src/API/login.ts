import {successToast, errorToast} from "@utils/notify.ts";
import { getApiUrl } from "@/utils/utils";

export const handleLogin = async (email: string, password: string) => {

    const tokenTime = 3600;

    try {
        const response = await fetch(`${getApiUrl()}/v1/auth`, {
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
            document.cookie = `authToken=${data.token}; path=/; max-age=${tokenTime}; SameSite=Strict; Secure`;
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
import { getApiUrl } from "@/utils/utils";

/**
 * Utilidad para hacer llamadas HTTP con CSRF token automático
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // Obtener CSRF token de localStorage
    const csrfToken = localStorage.getItem('csrfToken');

    // Preparar headers base
    const headers: HeadersInit = {
        ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
    };

    // Convertir options.headers a objeto plano si existe
    if (options.headers) {
        const existingHeaders = new Headers(options.headers);
        existingHeaders.forEach((value, key) => {
            (headers as Record<string, string>)[key] = value;
        });
    }

    // Solo agregar Content-Type si NO es FormData
    // FormData establece su propio Content-Type con boundary
    if (!(options.body instanceof FormData)) {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    // Hacer la llamada con credentials para enviar cookies
    const response = await fetch(`${getApiUrl()}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // Importante: envía cookies
    });

    return response;
}

/**
 * Helper para GET requests
 */
export async function apiGet(endpoint: string) {
    return apiFetch(endpoint, { method: 'GET' });
}

/**
 * Helper para POST requests
 */
export async function apiPost(endpoint: string, body: any) {
    return apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

/**
 * Helper para PUT requests
 */
export async function apiPut(endpoint: string, body: any) {
    return apiFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
}

/**
 * Helper para DELETE requests
 */
export async function apiDelete(endpoint: string) {
    return apiFetch(endpoint, { method: 'DELETE' });
}

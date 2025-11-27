import { getApiUrl } from "@/utils/utils";

/**
 * Utilidad para hacer llamadas HTTP con CSRF token automático
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // Obtener CSRF token de localStorage
    const csrfToken = localStorage.getItem('csrfToken');

    // Debug: Ver todas las cookies
    const allCookies = document.cookie.split('; ');
    const csrfCookies = allCookies.filter(c => c.startsWith('csrfToken='));

    console.log('🔍 CSRF Debug:', {
        localStorage: csrfToken?.substring(0, 10) + '...',
        cookieCount: csrfCookies.length,
        cookies: csrfCookies.map(c => c.split('=')[1].substring(0, 10) + '...'),
        endpoint: endpoint
    });

    // Preparar headers con CSRF
    const headers = {
        'Content-Type': 'application/json',
        ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        ...options.headers,
    };

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

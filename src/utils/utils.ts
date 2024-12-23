/**
 * Obtiene el valor de una cookie por su nombre desde los headers.
 * @param request - El objeto de solicitud (Request).
 * @param name - El nombre de la cookie que deseas obtener.
 * @returns El valor de la cookie o null si no se encuentra.
 */
function getCookieValue(request: Request, name: string): string | null {
  const cookiesHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookiesHeader.split('; ').map(cookie => cookie.split('='))
  );
  return cookies[name] || null;
}

// Format the date to a string
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  return new Date(date).toLocaleDateString(undefined, options);
}
// Capitalize the first letter
function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getApiUrl() : string {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.PUBLIC_API_PRODUCTION_URL
    : import.meta.env.PUBLIC_API_LOCAL_URL;
};


export { formatDate, capitalize, getApiUrl, getCookieValue };
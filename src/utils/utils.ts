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


export { formatDate, capitalize, getApiUrl };
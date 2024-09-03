import type { APIContext } from 'astro';

// export function authMiddleware(context: APIContext, next: () => Promise<Response>) {
//   const token = context.cookies.get('authToken')?.value;

//   if (!token) {
//     return new Response('Unauthorized', {
//       status: 401,
//       headers: {
//         'Location': '/'
//       }
//     });
//   }

//   return next();
// }

export async function authMiddleware(context: APIContext, next: () => Promise<Response>) {
  console.log('Request headers:', JSON.stringify(context.request.headers));
  console.log('All cookies:', JSON.stringify(context.cookies));
  
  const allCookies = context.request.headers.get('cookie');
  console.log('Raw cookie header:', allCookies);

  const token = context.cookies.get('authToken')?.value;
  console.log('Token from Astro cookies:', token);

  // Intenta obtener el token manualmente del header de cookies
  const manualToken = allCookies?.split(';').find(c => c.trim().startsWith('authToken='))?.split('=')[1];
  console.log('Manually extracted token:', manualToken);

  if (!token && !manualToken) {
    console.log('No token found, redirecting to login');
    return context.redirect('/', 302);
  }

  // Usa el token que encontramos (ya sea de Astro o manualmente)
  const finalToken = token || manualToken;
  console.log('Final token being used:', finalToken);

  return next();
}
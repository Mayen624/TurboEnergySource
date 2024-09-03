import type { APIContext } from 'astro';

export function authMiddleware(context: APIContext, next: () => Promise<Response>) {
  const token = context.cookies.get('authToken')?.value;

  if (!token) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'Location': '/'
      }
    });
  }

  // Aquí puedes agregar lógica adicional para verificar el token
  // Por ejemplo, podrías hacer una llamada a tu API para validar el token

  return next();
}
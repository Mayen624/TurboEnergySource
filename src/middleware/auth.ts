import type { APIContext } from 'astro';
import jwt from 'jsonwebtoken';

export async function authMiddleware(context: APIContext, next: () => Promise<Response>) {
  const token = context.cookies.get('authToken')?.value;

  if (!token) {
    return context.redirect('/?message=unauthorized', 302);
  }

  try {
    // Validar el JWT
    const decoded = jwt.verify(token, import.meta.env.JWT_PRIVATE_KEY);

    if (!decoded) {
      // Token inválido, limpiar cookie y redirigir
      context.cookies.delete('authToken', { path: '/' });
      context.cookies.delete('csrfToken', { path: '/' });
      return context.redirect('/?message=unauthorized', 302);
    }

    // Token válido, continuar
    return next();

  } catch (error) {
    // Token expirado o inválido, limpiar cookies y redirigir
    context.cookies.delete('authToken', { path: '/' });
    context.cookies.delete('csrfToken', { path: '/' });
    return context.redirect('/?message=session_expired', 302);
  }
}
import { defineMiddleware } from 'astro:middleware';
import { authMiddleware } from './middleware/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  // Proteger todas las rutas que empiecen con /admin
  if (context.url.pathname.startsWith('/admin')) {
    return authMiddleware(context, next);
  }

  // Para otras rutas, continuar sin autenticación
  return next();
});

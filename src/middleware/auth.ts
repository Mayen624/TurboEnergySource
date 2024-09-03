import type { APIContext } from 'astro';

export async function authMiddleware(context: APIContext, next: () => Promise<Response>) {
  const token = context.cookies.get('authToken')?.value;

  if (!token) {
    return context.redirect('/?message=unauthorized', 302);
  }

  return next();
}
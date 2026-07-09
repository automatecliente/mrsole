import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Apenas protege as rotas dentro de /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Permite acesso à página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Verifica se o cookie de sessão existe
    const authCookie = request.cookies.get('mrsole_admin_session');

    if (!authCookie || authCookie.value !== 'authenticated') {
      // Se não estiver logado, redireciona para a página de login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

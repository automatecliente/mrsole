import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mrsole.com.br';
    const adminPassword = process.env.ADMIN_PASSWORD || 'mrsole2026mr';

    if (email === adminEmail && password === adminPassword) {
      // Create response
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set a simple auth cookie
      response.cookies.set({
        name: 'mrsole_admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

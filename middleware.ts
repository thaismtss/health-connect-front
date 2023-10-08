import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  req => {
    const { token } = req.nextauth;

    const isLoginOrRegister = ['/login', '/cadastro'].some(path =>
      req.nextUrl.pathname.startsWith(path)
    );

    if (isLoginOrRegister && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = { matcher: ['/dashboard/(.*)', '/login', '/cadastro'] };

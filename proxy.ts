import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ACCESS_TOKEN_COOKIE = 'mtpc_admin_access_token';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  const isAdminRoot = pathname === '/admin';
  const isProtectedAdminRoute = pathname.startsWith('/admin/') && pathname !== '/admin';

  if (isProtectedAdminRoute && !token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (isAdminRoot && token) {
    return NextResponse.redirect(new URL('/admin/index', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

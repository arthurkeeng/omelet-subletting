import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Exclude `_not-found` and `/404` routes from processing cookies
  if (pathname === '/_not-found' || pathname === '/404') {
    return NextResponse.next();
  }

  // Example of middleware logic for authenticated routes
  const cookie = (await cookies()).get('omeenee-session')
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_not-found|404).*)', // Apply middleware to all routes except `_not-found` and `/404`
};

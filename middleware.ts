import { NextRequest, NextResponse } from 'next/server';

export const config = {
  //  The matcher config can also take an array of path
  matcher: [
    '/admin',
    '/user/:path*',
    '/host/:path*',
    '/edit/:path*',
    '/communities',
    '/search',
    '/map',
    '/messages',
    '/logout',
  ],
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

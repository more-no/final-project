import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/admin',
    '/user/:path*',
    '/host/:path*',
    '/edit/:path*',
    '/communities',
    '/search/:path*',
    '/map/:path*',
    '/messages/:path*',
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

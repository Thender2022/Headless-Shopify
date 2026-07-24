// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the public site
  const isPublicRoute = request.nextUrl.pathname === '/_next' || 
                        request.nextUrl.pathname.includes('/api');
  
  // Only protect main pages, not Next.js internal routes
  if (!isPublicRoute) {
    // Check for auth token in cookies
    const token = request.cookies.get('site-access');
    
    // If no token, redirect to password page
    if (!token || token.value !== 'your-secret-password') {
      return NextResponse.redirect(new URL('/password', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - password (password page itself)
     */
    '/((?!_next/static|_next/image|favicon.ico|password).*)',
  ],
};
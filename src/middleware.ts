import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge';

import { AUTH_COOKIE_NAME } from './constants/constants';
// const PRIVATE_PATHS = ['/'];

const PUBLIC_PATHS = ['/sign-in', '/sign-up'];
const REDIRECT_PATHS = ['/sign-up', '/sign-in'];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    cookieName: AUTH_COOKIE_NAME,
    cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEYS || ''],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24,
    },
    serviceAccount: {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID || '',
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || '',
      privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (REDIRECT_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }
      // const requestHeaders = new Headers(request.headers);
      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ['/api/login', '/api/logout', '/', '/((?!_next|favicon.ico|api|.*\\.).*)'],
};

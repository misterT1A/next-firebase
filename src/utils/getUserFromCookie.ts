import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';

import { AUTH_COOKIE_NAME } from '@/constants/constants';
import type { User } from '@/contexts/AuthContext';

import { toUser } from './toUser';

export async function getUserFromCookie(): Promise<User | null> {
  const cookieStore = await cookies();
  const tokens = await getTokens(cookieStore, {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    cookieName: AUTH_COOKIE_NAME,
    cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEYS || ''],
    serviceAccount: {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID || '',
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || '',
      privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  });

  return tokens ? toUser(tokens) : null;
}

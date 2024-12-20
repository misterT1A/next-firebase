'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUp(email: string, password: string, userName: string): Promise<void> {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(response.user, { displayName: userName });
  const idToken = await response.user.getIdToken();

  await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function signIn(email: string, password: string): Promise<void> {
  const response = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await response.user.getIdToken();

  await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function signOut(): Promise<void> {
  await fetch('/api/logout');
}

export { FirebaseError } from 'firebase/app';

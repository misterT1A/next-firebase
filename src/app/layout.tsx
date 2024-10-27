import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import type { ReactElement } from 'react';

import Header from '@/components/Header/Header';
import { getUserFromCookie } from '@/utils/getUserFromCookie';

import Providers from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Next-firebase',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  const user = await getUserFromCookie();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-auto mt-2 flex min-h-screen max-w-5xl flex-col antialiased`}
      >
        <Providers user={user}>
          <Header />
          <main className="flex flex-1 items-center justify-center">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

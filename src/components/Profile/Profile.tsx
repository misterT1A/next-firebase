'use client';

import Image from 'next/image';
import type { ReactElement } from 'react';
import React from 'react';

import { useAuth } from '@/contexts/AuthContext';

const Profile = (): ReactElement => {
  const { user } = useAuth();

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl">Your profile</h1>
        <div className="flex gap-3">
          <div className="max-w-48">
            <Image
              className="h-auto w-full"
              src="/images/user-icon.svg"
              width="0"
              height="0"
              sizes="100vw"
              alt="logo LB"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-md p-2 text-xl shadow-2xl">
            <p>Name: {user?.displayName || 'No name'}</p>
            <p>Email: {user?.email || 'No email'}</p>
            <p>Phone number: {user?.phoneNumber || 'No phone'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

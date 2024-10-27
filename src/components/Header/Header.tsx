'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ReactElement } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/services/firebaseAuth';


const Header = (): ReactElement => {
  const { user, setIsSignOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    setIsSignOut(true);
    await signOut();
    router.replace('/');
    router.refresh();
  };

  return (
    <header className="flex w-full items-center justify-between rounded-lg bg-slate-200 p-2">
      <Link href={'/'} className="w-fit rounded-lg bg-red-400 p-2 text-lg hover:bg-red-700">
        Main
      </Link>

      <nav>
        {user && (
          <button onClick={handleSignOut} className="text-orange-700 hover:text-orange-900">
            Log out
          </button>
        )}
        {!user && (
          <ul className="flex gap-3">
            <li>
              <Link className="text-orange-700 hover:text-orange-900" href={'/sign-in'}>
                SignIn
              </Link>
            </li>
            <li>
              <Link className="text-orange-700 hover:text-orange-900" href={'/sign-up'}>
                SignUp
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;

import Link from 'next/link';
import type { ReactElement } from 'react';

import SignInForm from '@/components/SignInForm/SignInForm';

const SignIn = (): ReactElement => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">Sign In</h2>
        <SignInForm />
        <div className="flex gap-4">
          {"Don't have an account?"}
          <Link href={'/sign-up'} className="text-blue-700">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

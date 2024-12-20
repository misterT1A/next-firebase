import Link from 'next/link';
import type { ReactElement } from 'react';

import SignUpForm from '@/components/SignUpForm/SignUpForm';

const SignUp = (): ReactElement => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">Sign Up</h2>
        <SignUpForm />
        <div className="flex gap-4">
          {'Already have an account?'}
          <Link href={'/sign-in'} className="text-blue-700">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

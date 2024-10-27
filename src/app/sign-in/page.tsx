'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { toast } from 'react-toastify';

import { signIn } from '@/services/firebaseAuth';
import type { ISignInValErr } from '@/types/types';

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validationErrors = {} as ISignInValErr;

    if (!email.includes('@')) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await signIn(email, password);
        router.replace('/');
        router.refresh();
      } catch {
        toast.error('Something went wrong.');
      }
    } else {
      validationErrors.email = 'Incorrect email address';
      validationErrors.password = 'Incorrect password';
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;

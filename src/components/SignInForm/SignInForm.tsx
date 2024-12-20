'use client';

import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState, type ReactElement } from 'react';
import { toast } from 'react-toastify';

import { signIn } from '@/services/firebaseAuth';
import type { ISignInValErr } from '@/types/types';

const SignInForm = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setLoading] = useState(false);
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
        setLoading(true);
        await signIn(email, password);
        toast.success('Logged in');
        router.replace('/');
        router.refresh();
      } catch {
        toast.error('Wrong email or password');
      } finally {
        setLoading(false);
      }
    } else {
      validationErrors.email = 'Incorrect email address';
      validationErrors.password = 'Incorrect password';
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-10">
        <TextField
          className="w-full"
          id="outlined-multiline-flexible"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="absolute left-0 top-16 z-10 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="relative mb-10">
        <TextField
          className="w-full"
          id="outlined-password-input"
          label="Password"
          value={password}
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="absolute left-0 top-16 z-10 text-sm text-red-500">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-lg text-white transition-colors hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress color="warning" size="20px" /> : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;

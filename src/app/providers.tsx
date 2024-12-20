'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import type { User } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthProvider';

type ProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

const Providers = ({ children, user }: ProviderProps): ReactNode => {
  return (
    <AppRouterCacheProvider>
      <AuthProvider user={user}>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;

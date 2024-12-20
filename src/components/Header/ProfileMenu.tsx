'use client';

import { Button, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { toast } from 'react-toastify';

import { AUTH_LINKS, NOAUTH_LINKS } from '@/constants/constants';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/services/firebaseAuth';

interface IProps {
  handleClose: () => void;
}

const ProfileMenu = ({ handleClose }: IProps): ReactElement => {
  const { user, setIsSignOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    setIsSignOut(true);
    await signOut();
    toast.success('Log out');
    router.replace('/');
    router.refresh();
  };

  const authHandler = ({ title, href }: { title: string; href: string }): void => {
    if (title === 'Sign Out') {
      handleSignOut();
      handleClose();
    } else {
      router.replace(href);
      handleClose();
    }
  };

  return (
    <>
      {user
        ? AUTH_LINKS.map((link) => (
            <MenuItem key={link.title}>
              <Button onClick={() => authHandler(link)}>{link.title}</Button>
            </MenuItem>
          ))
        : NOAUTH_LINKS.map((link) => (
            <MenuItem key={link.title} onClick={handleClose}>
              <Button onClick={() => authHandler(link)}>{link.title}</Button>
            </MenuItem>
          ))}
    </>
  );
};

export default ProfileMenu;

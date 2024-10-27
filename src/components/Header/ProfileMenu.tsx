'use client';

import { Button, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

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
    router.replace('/');
    router.refresh();
  };

  const authHandler = (linkName: string): void => {
    if (linkName === 'Sign Out') {
      handleSignOut();
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <>
      {user
        ? AUTH_LINKS.map((link) => (
            <MenuItem key={link.title} onClick={() => authHandler(link.title)}>
              <Button href={link.href}>{link.title}</Button>
            </MenuItem>
          ))
        : NOAUTH_LINKS.map((link) => (
            <MenuItem key={link.title} href={link.href} onClick={handleClose}>
              <Button href={link.href}>{link.title}</Button>
            </MenuItem>
          ))}
    </>
  );
};

export default ProfileMenu;

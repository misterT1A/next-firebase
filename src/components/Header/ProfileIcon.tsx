'use client';

import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';
import type { ReactElement } from 'react';
import { useState } from 'react';

import ProfileMenu from './ProfileMenu';

const ProfileIcon = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { sm: 'block' } }}>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ProfileMenu handleClose={handleClose} />
        </Menu>
      </div>
    </Box>
  );
};

export default ProfileIcon;

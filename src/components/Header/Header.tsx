'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Drawer, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { useState, type ReactElement } from 'react';

import { NAV_ITEMS } from '@/constants/constants';

import DrowerList from './Drower';
import ProfileIcon from './ProfileIcon';

const drawerWidth = 240;

interface IProps {
  children?: ReactElement;
}

function HideOnScroll(props: IProps): ReactElement {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const Header = (props: IProps): ReactElement => {
  const [mobileOpen, setMobileOpen] = useState(false);
  //   if (
  //     (event.type === 'keydown' && (event as KeyboardEvent).key === 'Tab') ||
  //     (event as KeyboardEvent).key === 'Shift'
  //   ) {
  //     return;
  //   }
  //   setDrawerOpen(open);
  // };

  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar sx={{ width: { sm: '100%' }, display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              MUI
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {NAV_ITEMS.map((item) => (
                <Button key={item.title} sx={{ color: '#fff', ':hover': { color: '#000000' } }} href={item.href}>
                  {item.title}
                </Button>
              ))}
            </Box>
            <ProfileIcon />
          </Toolbar>
          <nav>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              <DrowerList handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
          </nav>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;

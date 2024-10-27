import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import type { ReactElement } from 'react';

import { NAV_ITEMS } from '@/constants/constants';

interface IProps {
  handleDrawerToggle: () => void;
}

const DrowerList = ({ handleDrawerToggle }: IProps): ReactElement => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} href={item.href}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrowerList;

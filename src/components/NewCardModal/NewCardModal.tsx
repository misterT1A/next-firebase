import CancelIcon from '@mui/icons-material/Cancel';
import { Backdrop, Box, Button, Fade, IconButton, Modal, Stack } from '@mui/material';
import type { ReactElement } from 'react';
import React from 'react';

import AddUserForm from '../AddUserForm/AddUserForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const NewCardModal = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add new User
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="min-w-72 rounded-md sm:min-w-80">
            <Stack>
              <IconButton type="button" sx={{ marginLeft: 'auto' }} aria-label="close" onClick={handleClose}>
                <CancelIcon />
              </IconButton>
              <AddUserForm closeModal={handleClose} />
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewCardModal;

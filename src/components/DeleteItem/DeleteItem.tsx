import { Button } from '@mui/material';
import type { ReactElement } from 'react';

import { deleteUser } from '@/services/firebaseServerActions';

const DeleteItem = ({ id }: { id: string }): ReactElement => {
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteUser(id);
      console.log('User deleted successfully');
    } catch {
      console.log('Error deleting User: ');
    }
  };

  return (
    <Button onClick={handleDelete} variant="contained">
      Delete
    </Button>
  );
};

export default DeleteItem;

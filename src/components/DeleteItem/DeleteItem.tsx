'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

import { deleteUser } from '@/services/firebaseServerActions';

const DeleteItem = ({ id }: { id: string }): ReactElement => {
  const router = useRouter();
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteUser(id);
      router.refresh();
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

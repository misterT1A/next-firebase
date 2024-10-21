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
    <button onClick={handleDelete} className="rounded border bg-red-400 p-1 text-white hover:bg-red-900">
      Delete Item
    </button>
  );
};

export default DeleteItem;

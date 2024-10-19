import { doc, deleteDoc } from 'firebase/firestore';
import type { ReactElement } from 'react';

import db from '../../utils/firestore';

const DeleteItem = ({ id }: { id: string }): ReactElement => {
  const handleDelete = async (): Promise<void> => {
    const itemRef = doc(db, 'items', id);
    try {
      await deleteDoc(itemRef);
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Error deleting item');
    }
  };

  return (
    <button onClick={handleDelete} className="rounded border bg-red-400 p-1 text-white">
      Delete Item
    </button>
  );
};

export default DeleteItem;

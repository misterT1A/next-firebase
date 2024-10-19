'use client';

import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import db from '../../utils/firestore';
import DeleteItem from '../DeleteItem/DeleteItem';

type Data = { id: string; name: string };

const List = (): ReactElement => {
  const [items, setItems] = useState<Data[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'items'), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(updatedData as Data[]);
    });

    return (): void => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Data));
    };

    fetchItems();
  }, []);

  return (
    <div className="w-96 border p-4 text-center">
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-t-2 p-2">
            <p>{item.name}</p>
            <DeleteItem id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;

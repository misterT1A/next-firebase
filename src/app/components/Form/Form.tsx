'use client';

import { collection, addDoc } from 'firebase/firestore';
import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import db from '../../utils/firestore';

const Form = (): ReactElement => {
  const [value, setValue] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        name: value,
      });
      console.log('Document written with ID: ', docRef.id);
      setValue('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default Form;

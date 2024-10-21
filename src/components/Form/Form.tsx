'use client';

import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import { addUser } from '@/services/firebaseServerActions';

const Form = (): ReactElement => {
  const [nameValue, setName] = useState('');
  const [ageValue, setAge] = useState('');
  const [descriptionValue, setdescription] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const user = { name: nameValue, age: ageValue, description: descriptionValue };

    try {
      await addUser(user);
      setName('');
      setAge('');
      setdescription('');
      console.log('Adding user success');
    } catch {
      console.log('Error adding user');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-sm flex-col items-center gap-2 rounded-md border bg-slate-700 p-2"
    >
      <h2>Add new User</h2>
      <input
        type="text"
        className="rounded-md p-1 text-black"
        value={nameValue}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="text"
        className="rounded-md p-1 text-black"
        value={ageValue}
        onChange={(e) => setAge(e.target.value)}
        placeholder="age"
      />
      <input
        type="text"
        className="rounded-md p-1 text-black"
        value={descriptionValue}
        onChange={(e) => setdescription(e.target.value)}
        placeholder="description"
      />
      <button type="submit" className="w-1/3 rounded-md border p-2 hover:bg-slate-600">
        submit
      </button>
    </form>
  );
};

export default Form;

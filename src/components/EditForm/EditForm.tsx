'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import { updateUser } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';

const EditForm = ({ initData }: { initData: UserType }): ReactElement => {
  const [nameValue, setName] = useState(initData.name || '');
  const [ageValue, setAge] = useState(initData.age || '');
  const [descriptionValue, setdescription] = useState(initData.description || '');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    router.push('/');
    const user = { name: nameValue, age: ageValue, description: descriptionValue };

    await updateUser(user, initData.id);
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

export default EditForm;

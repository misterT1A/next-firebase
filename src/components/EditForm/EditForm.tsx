'use client';

import { Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import { updateUser } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';

const EditForm = ({ initData }: { initData: UserType }): ReactElement => {
  const [nameValue, setName] = useState(initData.name || '');
  const [ageValue, setAge] = useState(initData.age || '');
  const [descriptionValue, setdescription] = useState(initData.description || '');
  const [hasError, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!nameValue.length || !ageValue.length || !descriptionValue.length) {
      setError(true);
      return;
    }
    setError(false);

    const user = { name: nameValue, age: ageValue, description: descriptionValue };
    try {
      await updateUser(user, initData.id);
      router.push('/');
      console.log('Change user success');
    } catch (err) {
      console.log('Error changing user', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col items-center gap-2 rounded-md p-2">
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Change User
      </Typography>
      <TextField
        className="w-full"
        id="outlined-multiline-flexible"
        label="Name"
        multiline
        maxRows={1}
        value={nameValue}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className="w-full"
        id="outlined-multiline-flexible"
        label="Age"
        multiline
        maxRows={1}
        value={ageValue}
        onChange={(e) => setAge(e.target.value)}
      />
      <TextField
        className="w-full"
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        rows={4}
        value={descriptionValue}
        onChange={(e) => setdescription(e.target.value)}
      />
      <div className="relative w-full">
        {hasError && (
          <span className="absolute left-0 top-0 z-10 w-full text-center text-red-700">All fields are required</span>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-2">
        <Button type="submit" variant="outlined">
          Change
        </Button>
        <Button variant="contained">
          <Link href="/">Return</Link>
        </Button>
      </div>
    </form>
  );
};

export default EditForm;

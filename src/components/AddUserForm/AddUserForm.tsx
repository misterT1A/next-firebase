'use client';

import { serverTimestamp } from '@firebase/firestore';
import { Button, TextField, Typography } from '@mui/material';
import type { FC, FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import { addUser } from '@/services/firebaseServerActions';

interface IProps {
  closeModal: () => void;
}

const AddUserForm: FC<IProps> = ({ closeModal }): ReactElement => {
  const [nameValue, setName] = useState('');
  const [ageValue, setAge] = useState('');
  const [descriptionValue, setdescription] = useState('');
  const [hasError, setError] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!nameValue.length || !ageValue.length || !descriptionValue.length) {
      setError(true);
      return;
    }
    setError(false);
    const user = {
      name: nameValue.toLowerCase(),
      age: ageValue,
      description: descriptionValue.toLowerCase(),
      createdAt: serverTimestamp(),
    };

    try {
      await addUser(user);
      setName('');
      setAge('');
      setdescription('');
      closeModal();
      console.log('Adding user success');
    } catch {
      console.log('Error adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col items-center gap-2 rounded-md p-2">
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Add new User
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

      <div className="mt-12">
        <Button type="submit" variant="outlined">
          submit
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;

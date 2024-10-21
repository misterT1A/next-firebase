'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';

import { updateUsers } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';

import DeleteItem from '../DeleteItem/DeleteItem';

const List = ({ data }: { data: UserType[] }): ReactElement => {
  const [users, setUsers] = useState<UserType[]>(data);

  useEffect(() => {
    const unsubscribe = updateUsers(setUsers);

    return (): void => unsubscribe();
  }, []);

  return (
    <div className="w-96 rounded-md border bg-slate-50 p-4">
      <h2 className="text-center font-bold text-black">List of Users</h2>
      <ul className="max-h-[600px] overflow-y-auto">
        {!!users.length &&
          users.map((user) => (
            <li key={user.id} className="rounded-md border-t-2 bg-slate-400 p-2 text-left">
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Description: {user.description}</p>
              <DeleteItem id={user.id} />
              <Link href={`/edit/${user.id}`} className="rounded border bg-blue-400 p-1 text-white hover:bg-blue-900">
                Edit
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;

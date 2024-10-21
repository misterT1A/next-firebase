'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';

import { getSearchUsers, getSortUsers, updateUsers } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';
import { SortEnum } from '@/types/types';

import DeleteItem from '../DeleteItem/DeleteItem';
import SearchPanel from '../SearchPanel/SearchPanel';

const List = ({ data }: { data: UserType[] }): ReactElement => {
  const [users, setUsers] = useState<UserType[]>(data);

  useEffect(() => {
    const unsubscribe = updateUsers(setUsers);

    return (): void => unsubscribe();
  }, []);

  const sortHandler = async (type: SortEnum): Promise<void> => {
    const users = await getSortUsers(type);
    setUsers(users);
  };

  const searchHandler = async (query: string): Promise<void> => {
    const users = await getSearchUsers(query);
    setUsers(users);
  };

  return (
    <div className="w-96 rounded-md border bg-slate-50 p-4">
      <h2 className="text-center font-bold text-black">List of Users</h2>
      <SearchPanel submitHandler={searchHandler} />
      <ul className="max-h-[600px] overflow-y-auto">
        {!!users.length &&
          users.map((user) => (
            <li key={user.id} className="rounded-md border-t-2 bg-slate-400 p-2 text-left">
              <p>Date: {user.time}</p>
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
      <div className="flex gap-2">
        <button
          onClick={() => sortHandler(SortEnum.ASC)}
          className="rounded border bg-blue-400 p-1 text-white hover:bg-blue-900"
        >
          ASC
        </button>
        <button
          onClick={() => sortHandler(SortEnum.DESC)}
          className="rounded border bg-blue-400 p-1 text-white hover:bg-blue-900"
        >
          DESC
        </button>
      </div>
    </div>
  );
};

export default List;

'use client';

import type { DocumentSnapshot } from '@firebase/firestore';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';

import {
  getCountUsers,
  getCurrentPage,
  getCurrentUserDoc,
  getSearchUsers,
  getSortUsers,
  updateUsers,
} from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';
import { PageDirection } from '@/types/types';
import { SortEnum } from '@/types/types';

import DeleteItem from '../DeleteItem/DeleteItem';
import Pagination from '../Pagination/Pagination';
import SearchPanel from '../SearchPanel/SearchPanel';

interface Iprops {
  data: UserType[];
  lastUserID: string;
}

const List = ({ data, lastUserID }: Iprops): ReactElement => {
  const [users, setUsers] = useState<UserType[]>(data);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | undefined>(undefined);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>(undefined);
  const [pages, setPages] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<PageDirection | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = updateUsers(setUsers);
    return (): void => unsubscribe();
  }, []);

  useEffect(() => {
    getCountUsers().then((pages) => setPages(pages));
    getCurrentUserDoc(lastUserID).then((user) => setLastDoc(user));
  }, [lastUserID]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const startAfterDoc = direction === PageDirection.NEXT ? lastDoc : undefined;
    const endBeforeDoc = direction === PageDirection.PREV ? firstDoc : undefined;

    getCurrentPage(direction, startAfterDoc, endBeforeDoc).then((data) => {
      setFirstDoc(data.firstDoc);
      setLastDoc(data.lastDoc);
      setUsers(data.result);
    });
  }, [direction]);

  const sortHandler = async (type: SortEnum): Promise<void> => {
    const users = await getSortUsers(type);
    setUsers(users);
  };

  const searchHandler = async (query: string): Promise<void> => {
    const [users] = await getSearchUsers(query);
    setUsers(users);
  };

  const handlePreviousClick = (): void => {
    if (page === 1) return;
    setDirection(PageDirection.PREV);
    setPage((prev) => prev - 1);
  };

  const handleNextClick = (): void => {
    if (page === pages) return;
    setDirection(PageDirection.NEXT);
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex w-96 flex-col items-center gap-4 rounded-md border bg-slate-50 p-4">
      <h2 className="text-center font-bold text-black">List of Users</h2>
      <SearchPanel submitHandler={searchHandler} />
      <ul className="max-h-[600px] w-full overflow-y-auto">
        {!!users.length &&
          users.map((user) => (
            <li key={user.id} className="rounded-md border-t-2 bg-slate-400 p-2 text-left">
              <p className="text-yellow-400">Date: {user.time}</p>
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
      <Pagination nextHandler={handleNextClick} prevHandler={handlePreviousClick} />
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

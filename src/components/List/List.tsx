'use client';

import { Button, Typography } from '@mui/material';
import { useState, type ReactElement } from 'react';

import type { UserType } from '@/types/types';

import NewCardModal from '../NewCardModal/NewCardModal';
// import Pagination from '../Pagination/Pagination';
import SearchPanel from '../SearchPanel/SearchPanel';
import SortButtons from '../SortButtons/SortButtons';
import UserCard from '../UserCard/UserCard';

interface Iprops {
  data: UserType[];
  // lastUserID: string;
}

const List = ({ data }: Iprops): ReactElement => {
  const [value, setValue] = useState(0);
  // const [users, setUsers] = useState<UserType[]>(data);
  // const [isFirstRender, setIsFirstRender] = useState(true);
  // const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | undefined>(undefined);
  // const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>(undefined);
  // const [pages, setPages] = useState<number | 0>(0);
  // const [direction, setDirection] = useState<PageDirection | undefined>(undefined);

  // useEffect(() => {
  //   const unsubscribe = updateUsers(setUsers);
  //   return (): void => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   getCountUsers().then((pages) => setPages(pages));
  //   getCurrentUserDoc(lastUserID).then((user) => setLastDoc(user));
  // }, [lastUserID]);

  // useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //     return;
  //   }
  //   console.log('22');
  //   const startAfterDoc = direction === PageDirection.NEXT ? lastDoc : undefined;
  //   const endBeforeDoc = direction === PageDirection.PREV ? firstDoc : undefined;

  //   getCurrentPage(direction, startAfterDoc, endBeforeDoc).then((data) => {
  //     setFirstDoc(data.firstDoc);
  //     setLastDoc(data.lastDoc);
  //     setUsers(data.result);
  //   });
  // }, [direction]);

  return (
    <div className="flex w-full flex-col justify-between gap-4 p-4 lg:flex-row">
      <div className="order-2 flex h-fit flex-col items-center gap-4 rounded-md border bg-slate-50 p-4 lg:order-1">
        <ul className="flex w-full flex-col gap-2 lg:min-w-[400px]">
          {!data.length && <Typography textAlign={'center'}>No results</Typography>}
          {!!data.length && data.map((user) => <UserCard key={user.id} user={user} />)}
        </ul>
      </div>
      <div className="order-1 flex h-fit flex-col items-center gap-4 rounded-md border bg-slate-50 p-4 lg:order-1">
        <SearchPanel />
        {/* <Pagination setDirection={setDirection} pages={pages} /> */}
        <SortButtons />
        <NewCardModal />
        {value}
        <Button onClick={() => setValue(value + 1)}>gg</Button>
      </div>
    </div>
  );
};

export default List;

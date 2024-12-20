import { Typography } from '@mui/material';
import { type ReactElement } from 'react';

import type { UserType } from '@/types/types';

import NewCardModal from '../NewCardModal/NewCardModal';
import SearchPanel from '../SearchPanel/SearchPanel';
import SortButtons from '../SortButtons/SortButtons';
import UserCard from '../UserCard/UserCard';

interface Iprops {
  data: UserType[];
}

const List = ({ data }: Iprops): ReactElement => {
  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <div className="order-2 flex h-fit flex-col items-center gap-4 rounded-md border bg-slate-50 p-4 lg:order-1">
        <ul className="flex w-full flex-col gap-2 lg:min-w-[400px]">
          {!data.length && <Typography textAlign={'center'}>No results</Typography>}
          {!!data.length && data.map((user) => <UserCard key={user.id} user={user} />)}
        </ul>
      </div>
      <div className="order-1 flex h-fit flex-col items-center gap-4 rounded-md border bg-slate-50 p-4 lg:order-1">
        <SearchPanel />
        <SortButtons />
        <NewCardModal />
      </div>
    </div>
  );
};

export default List;

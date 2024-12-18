'use client';

import { type ReactElement } from 'react';

import type { UserType } from '@/types/types';

import List from '../List/List';

const Home = ({ users, lastUserID }: { users: UserType[]; lastUserID: string }): ReactElement => {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <h1 className="text-center text-2xl font-bold text-black">User list</h1>
      <List data={users} lastUserID={lastUserID} />
    </section>
  );
};

export default Home;

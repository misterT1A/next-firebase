import { type ReactElement } from 'react';

import type { UserType } from '@/types/types';

import List from '../List/List';

const Home = ({ users }: { users: UserType[] }): ReactElement => {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <h1 className="text-center text-2xl font-bold text-black">User list</h1>
      <List data={users} />
    </section>
  );
};

export default Home;

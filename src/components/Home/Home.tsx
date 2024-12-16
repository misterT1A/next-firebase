'use client';

import { type ReactElement } from 'react';

// import type { UserType } from '@/types/types';
// import { useAuth } from '@/contexts/AuthContext';

// import Form from '../Form/Form';
// import List from '../List/List';

// const Home = ({ users, lastUserID }: { users: UserType[]; lastUserID: string }): ReactElement => {
const Home = (): ReactElement => {
  // const { user } = useAuth();

  // console.log(user);

  return (
    <section className="flex w-full flex-col items-center">
      <aside className="flex gap-3">
        <h1>Home Page</h1>
        {/* <section className="flex w-2/3 flex-col items-center">
        <List data={users} lastUserID={lastUserID} />
      </section>
      <section className="w-1/3">
        <Form />
      </section> */}
      </aside>
    </section>
  );
};

export default Home;

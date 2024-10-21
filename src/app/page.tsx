import type { ReactElement } from 'react';

import { getUsers } from '@/services/firebaseServerActions';

import Form from '../components/Form/Form';
import List from '../components/List/List';

export default async function Home(): Promise<ReactElement> {
  const users = await getUsers();
  return (
    <main className="m-auto mt-10 max-w-5xl">
      <aside className="flex gap-3">
        <section className="flex w-2/3 flex-col items-center">
          <List data={users} />
        </section>
        <section className="w-1/3">
          <Form />
        </section>
      </aside>
    </main>
  );
}

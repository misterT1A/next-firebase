import type { ReactElement } from 'react';

import Home from '@/components/Home/Home';
import { getUsers } from '@/services/firebaseServerActions';
import type { ParamsPage } from '@/types/types';

export default async function HomePage({ searchParams }: ParamsPage): Promise<ReactElement> {
  const { query, sort } = await searchParams;

  const [users] = await getUsers(query, sort);
  return <Home users={users} />;
}

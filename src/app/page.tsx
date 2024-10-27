import type { ReactElement } from 'react';

import Home from '@/components/Home/Home';
// import { getUsers } from '@/services/firebaseServerActions';

export default async function HomePage(): Promise<ReactElement> {
  // const [users, lastUserID] = await getUsers();
  // return <Home users={users} lastUserID={lastUserID} />;
  return <Home />;
}

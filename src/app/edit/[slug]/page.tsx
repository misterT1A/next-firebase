import type { ReactElement } from 'react';

import EditForm from '@/components/EditForm/EditForm';
import { getCurrentUser } from '@/services/firebaseServerActions';
import type { ParamsPage } from '@/types/types';

const Edit = async (paramsPage: ParamsPage): Promise<ReactElement> => {
  const { slug } = await paramsPage.params;
  const user = await getCurrentUser(slug || '');
  if (!user) return <h1>User not found</h1>;
  return (
    <section className="flex w-full justify-center">
      <EditForm initData={user} />
    </section>
  );
};

export default Edit;

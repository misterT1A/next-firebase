import type { ReactElement } from 'react';

import EditForm from '@/components/EditForm/EditForm';
import { getCurrentUser } from '@/services/firebaseServerActions';
import type { ParamsPage } from '@/types/types';

const Edit = async ({ params }: { params: ParamsPage }): Promise<ReactElement> => {
  const user = await getCurrentUser(params.slug);

  if (!user) return <h1>No User founded</h1>;
  return <EditForm initData={user} />;
};

export default Edit;

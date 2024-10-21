import type { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import type { UserType } from '@/types/types';

const buildUser = (data: QueryDocumentSnapshot<DocumentData, DocumentData>[]): UserType[] => {
  return data.map(
    (user) =>
      ({ name: user.data().name, age: user.data().age, description: user.data().description, id: user.id }) as UserType,
  );
};

export { buildUser };

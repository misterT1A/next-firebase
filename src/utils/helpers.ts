import type { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import type { UserType } from '@/types/types';

const buildUsers = (data: QueryDocumentSnapshot<DocumentData, DocumentData>[]): UserType[] => {
  return data.map(
    (user) =>
      ({
        name: user.data().name,
        age: user.data().age,
        description: user.data().description,
        id: user.id,
        time: user.data().createdAt.toDate().toLocaleString('ru-RU'),
      }) as UserType,
  );
};

const buildUser = (data: QueryDocumentSnapshot<DocumentData, DocumentData>): UserType => {
  return {
    name: data.data().name,
    age: data.data().age,
    description: data.data().description,
    id: data.id,
  } as UserType;
};

export { buildUsers, buildUser };

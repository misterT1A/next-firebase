import type { DocumentSnapshot, FieldValue } from '@firebase/firestore';

export type UserType = {
  id: string;
  name: string;
  age: string;
  description: string;
  time: string;
};

export type UserForUpdateType = Omit<UserType, 'id' | 'time'>;
export type UserForAddType = UserForUpdateType & { createdAt: FieldValue };

export type ParamsPage = { slug: string };

export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export enum PageDirection {
  NEXT = 'next',
  PREV = 'prev',
}

export interface ICurrentPageProps {
  result: UserType[];
  lastDoc: DocumentSnapshot;
  firstDoc: DocumentSnapshot;
}

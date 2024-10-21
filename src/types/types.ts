import type { FieldValue } from '@firebase/firestore';

export type UserType = {
  id: string;
  name: string;
  age: string;
  description: string;
  time: string;
};

export type UserForAddType = Omit<UserType, 'id' | 'time'> & { createdAt: FieldValue };

export type ParamsPage = { slug: string };

export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

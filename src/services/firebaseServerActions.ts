'use server';

import type { DocumentSnapshot } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { COUNT_USERS_ON_PAGE } from '@/constants/constants';
import type { UserForUpdateType, UserType } from '@/types/types';
import { isSortEnum, SortEnum } from '@/types/types';
import { PageDirection } from '@/types/types';
import db from '@/utils/firestore';
import { buildUser, buildUsers } from '@/utils/helpers';

const getUsers = async (queryParam: string, sortParam: string): Promise<[UserType[]]> => {
  const collectionRef = collection(db, 'users');

  let q;

  const order = isSortEnum(sortParam)
    ? orderBy('createdAt', sortParam as SortEnum)
    : orderBy('createdAt', SortEnum.ASC);

  if (queryParam) {
    const searchValueAfter = where('name', '>=', queryParam);
    const searchValueBefore = where('name', '<=', queryParam + '\uf8ff');

    q = query(collectionRef, searchValueAfter, searchValueBefore, order);
  } else {
    q = query(collectionRef, order);
  }

  const data = await getDocs(q);
  const users = buildUsers(data.docs);
  return [users];
};

const getCurrentPage = async (
  direction: PageDirection | undefined,
  startAfterDoc?: DocumentSnapshot,
  endBeforeDoc?: DocumentSnapshot,
): Promise<{ result: UserType[]; lastDoc: DocumentSnapshot; firstDoc: DocumentSnapshot }> => {
  const collectionRef = collection(db, 'users');
  let dataQuery = query(collectionRef, orderBy('createdAt', SortEnum.ASC), limit(COUNT_USERS_ON_PAGE));

  if (direction === PageDirection.NEXT && startAfterDoc) {
    dataQuery = query(dataQuery, startAfter(startAfterDoc));
  } else if (direction === PageDirection.PREV && endBeforeDoc) {
    dataQuery = query(
      collectionRef,
      orderBy('createdAt', SortEnum.ASC),
      endBefore(endBeforeDoc),
      limitToLast(COUNT_USERS_ON_PAGE),
    );
  }

  const productsSnapshot = await getDocs(dataQuery);
  const products = buildUsers(productsSnapshot.docs);
  console.log('current page', products);
  return {
    result: products as UserType[],
    lastDoc: productsSnapshot.docs[productsSnapshot.docs.length - 1],
    firstDoc: productsSnapshot.docs[0],
  };
};

const getCurrentUser = async (userId: string): Promise<UserType | null> => {
  const userRef = doc(db, 'users', userId);
  const data = await getDoc(userRef);
  if (data.exists()) {
    return buildUser(data);
  } else {
    console.log('No such user!');
    return null;
  }
};

const addUser = async (user: UserForUpdateType): Promise<void> => {
  const collectionRef = collection(db, 'users');
  const data = {
    ...user,
    createdAt: serverTimestamp(),
  };
  await addDoc(collectionRef, data);
};

const deleteUser = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};

const updateUser = async (user: UserForUpdateType, userID: string): Promise<void> => {
  const userRef = doc(db, 'users', userID);

  try {
    await updateDoc(userRef, { ...user });

    console.log('User updated');
  } catch {
    console.log('User not updated');
  }
};

export { getUsers, addUser, getCurrentPage, deleteUser, getCurrentUser, updateUser };

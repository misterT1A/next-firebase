'use server';

import type { DocumentSnapshot, Unsubscribe } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { Dispatch, SetStateAction } from 'react';

import { COUNT_USERS_ON_PAGE } from '@/constants/constants';
import type { UserForUpdateType, UserType } from '@/types/types';
import { isSortEnum, SortEnum } from '@/types/types';
import { PageDirection } from '@/types/types';
import db from '@/utils/firestore';
import { buildUser, buildUsers } from '@/utils/helpers';

const getUsers = async (queryParam: string | null, sortParam: string | null): Promise<[UserType[]]> => {
  const collectionRef = collection(db, 'users');

  let q;

  const order = isSortEnum(sortParam || '')
    ? orderBy('createdAt', sortParam as SortEnum)
    : orderBy('createdAt', SortEnum.ASC);

  const limitUsers = limit(COUNT_USERS_ON_PAGE);

  if (queryParam) {
    const searchValueAfter = where('name', '>=', queryParam);
    const searchValueBefore = where('name', '<=', queryParam + '\uf8ff');

    q = query(collectionRef, searchValueAfter, searchValueBefore, order, limitUsers);
  } else {
    q = query(collectionRef, order, limitUsers);
  }

  const data = await getDocs(q);
  const users = buildUsers(data.docs);
  // let lastUserID = '';
  // if (users.length >= COUNT_USERS_ON_PAGE) {
  //   lastUserID = data.docs[COUNT_USERS_ON_PAGE - 1].id;
  // } else if (users.length === 0) {
  //   lastUserID = '';
  // } else {
  //   lastUserID = data.docs[data.docs.length - 1].id;
  // }

  // console.log('get user', users);
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

const getCountUsers = async (): Promise<number> => {
  const collectionRef = collection(db, 'users');
  const data = await getCountFromServer(collectionRef);
  return Math.ceil(data.data().count / COUNT_USERS_ON_PAGE);
};

const getSortUsers = async (type: SortEnum): Promise<UserType[]> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, orderBy('createdAt', type));
  const data = await getDocs(q);

  return buildUsers(data.docs);
};

const getQueryUser = async (): Promise<void> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('age', '==', '34'));
  const data = await getDocs(q);
  data.forEach((user) => console.log(user.data()));
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

const getCurrentUserDoc = async (userId: string): Promise<DocumentSnapshot> => {
  const userRef = doc(db, 'users', userId);
  const data = await getDoc(userRef);

  return data;
};

const getSearchUsers = async (search: string): Promise<[UserType[]] | [UserType[], string]> => {
  if (!search) {
    // return getUsers();
  }
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
  const data = await getDocs(q);
  const users = buildUsers(data.docs);

  return [users];
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

const updateUsers = (setState: Dispatch<SetStateAction<UserType[]>>): Unsubscribe => {
  let isInitialLoad = true;

  const collectionRef = collection(db, 'users');
  const dataQuery = query(collectionRef, orderBy('createdAt', SortEnum.ASC), limit(COUNT_USERS_ON_PAGE));
  const unsubscribe = onSnapshot(dataQuery, (snapshot) => {
    if (!snapshot.metadata.hasPendingWrites) {
      const users = buildUsers(snapshot.docs);
      console.log('update', users);
      if (!isInitialLoad) {
        setState(users);
      }
      isInitialLoad = false;
    }
  });

  return unsubscribe;
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

export {
  getUsers,
  getCountUsers,
  addUser,
  getCurrentPage,
  deleteUser,
  updateUsers,
  getQueryUser,
  getCurrentUser,
  getSearchUsers,
  updateUser,
  getSortUsers,
  getCurrentUserDoc,
};

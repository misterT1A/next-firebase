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
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { Dispatch, SetStateAction } from 'react';

import { COUNT_USERS_ON_PAGE } from '@/constants/constants';
import type { UserForAddType, UserForUpdateType, UserType } from '@/types/types';
import { SortEnum } from '@/types/types';
import { PageDirection } from '@/types/types';
import db from '@/utils/firestore';
import { buildUser, buildUsers } from '@/utils/helpers';

const getUsers = async (): Promise<[UserType[], string]> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, orderBy('createdAt', SortEnum.ASC), limit(COUNT_USERS_ON_PAGE));
  const data = await getDocs(q);
  const users = buildUsers(data.docs);
  const lastUserID = data.docs[COUNT_USERS_ON_PAGE - 1].id;
  return [users, lastUserID];
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
    return getUsers();
  }
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
  const data = await getDocs(q);
  const users = buildUsers(data.docs);

  return [users];
};

const addUser = async (user: UserForAddType): Promise<void> => {
  const collectionRef = collection(db, 'users');
  await addDoc(collectionRef, user);
};

const deleteUser = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};

const updateUsers = (setState: Dispatch<SetStateAction<UserType[]>>): Unsubscribe => {
  // const isInitialLoad = true;

  const collectionRef = collection(db, 'users');
  const dataQuery = query(collectionRef, orderBy('createdAt', SortEnum.ASC), limit(COUNT_USERS_ON_PAGE));
  const unsubscribe = onSnapshot(dataQuery, (snapshot) => {
    // if (!snapshot.metadata.hasPendingWrites) {
    const users = buildUsers(snapshot.docs);

    // if (!isInitialLoad) {
    setState(users);
    // }
    // isInitialLoad = false;
    // }
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

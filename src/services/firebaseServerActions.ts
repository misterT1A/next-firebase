import type { Unsubscribe } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { Dispatch, SetStateAction } from 'react';

import type { SortEnum, UserForAddType, UserType } from '@/types/types';
import db from '@/utils/firestore';
import { buildUser, buildUsers } from '@/utils/helpers';

const getUsers = async (): Promise<UserType[]> => {
  const collectionRef = collection(db, 'users');
  const data = await getDocs(collectionRef);
  const users = buildUsers(data.docs);

  return users;
};

const getSortUsers = async (type: SortEnum): Promise<UserType[]> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, orderBy('createdAt', type));
  const data = await getDocs(q);
  console.log(data);
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

const getSearchUsers = async (search: string): Promise<UserType[]> => {
  if (!search) {
    return getUsers();
  }
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
  const data = await getDocs(q);
  const users = buildUsers(data.docs);

  return users;
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
  const collectionRef = collection(db, 'users');
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const users = buildUsers(snapshot.docs);
    setState(users);
  });

  return unsubscribe;
};

const updateUser = async (user: UserForAddType, userID: string): Promise<void> => {
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
  addUser,
  deleteUser,
  updateUsers,
  getQueryUser,
  getCurrentUser,
  getSearchUsers,
  updateUser,
  getSortUsers,
};

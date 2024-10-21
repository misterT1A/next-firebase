import type { Unsubscribe } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import type { Dispatch, SetStateAction } from 'react';

import type { UserForAddType, UserType } from '@/types/types';
import db from '@/utils/firestore';
import { buildUser } from '@/utils/helpers';

const getUsers = async (): Promise<UserType[]> => {
  const collectionRef = collection(db, 'users');
  const data = await getDocs(collectionRef);
  const users = buildUser(data.docs);

  return users;
};

const getCurrentUSer = async (): Promise<void> => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('age', '==', '34'));
  const data = await getDocs(q);
  data.forEach((user) => console.log(user.data()));
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
    const users = buildUser(snapshot.docs);
    setState(users);
  });

  return unsubscribe;
};

export { getUsers, addUser, deleteUser, updateUsers, buildUser, getCurrentUSer };

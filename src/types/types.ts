export type UserType = {
  id: string;
  name: string;
  age: string;
  description: string;
};

export type UserForAddType = Omit<UserType, 'id'>;

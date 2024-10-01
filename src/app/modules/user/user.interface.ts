export type TUser = {
    name: string;
    email: string;
    image: string;
    role: 'user' | 'admin';
    password: string;
    isDeleted: boolean;
  }
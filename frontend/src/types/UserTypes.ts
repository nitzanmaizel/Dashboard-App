export type UserRole = 'user' | 'admin';

export interface IUser {
  name: string;
  userId?: string;
  email: string;
  role: UserRole;
  picture?: string;
}

export interface RIUsersType {
  users: IUser[];
  limit: number;
  page: number;
  total: number;
}

export type UserContextType = {
  userInfo: IUser | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
};

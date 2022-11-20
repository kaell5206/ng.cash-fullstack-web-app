export interface IUser {
  id?: number;
  username?: string;
  accountId?: number;
  token?: string;
}

export interface globalContext {
  userInfo: IUser;
  setUserInfo: (user: IUser | null) => void;
}
import { IUser } from "@interfaces";

export enum EUserStatus {
  LoggedOut = 'loggedOut',
  Authorization = 'authorization',
  LoggedIn = 'loggedIn',
  Refresh = 'refresh',
  Loading = 'loading',
}

export interface IUserState {
  user: IUser;
  status: EUserStatus;
}

export const initialUserState: IUserState = {
  user: null,
  status: EUserStatus.LoggedOut,
};
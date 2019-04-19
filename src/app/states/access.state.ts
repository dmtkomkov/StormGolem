import { IUser } from "@interfaces";

export enum EAccessStatus {
  LoggedOut = 'loggedOut',
  Authorization = 'authorization',
  LoggedIn = 'loggedIn',
  Refresh = 'refresh',
  Identification = 'identification',
}

export interface IAccessState {
  user: IUser;
  status: EAccessStatus;
}

export const initialUserState: IAccessState = {
  user: null,
  status: EAccessStatus.LoggedOut,
};
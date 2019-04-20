import { IUser } from "@interfaces";
import {createFeatureSelector, createSelector} from "@ngrx/store";

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
  status: null,
};

export const accessSlice = createFeatureSelector<IAccessState>('access');

export const statusSlice = createSelector(
  accessSlice,
  (accessState: IAccessState) => accessState.status,
);
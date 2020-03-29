import { createFeatureSelector } from "@ngrx/store";

export enum EAuthStatus {
  LoggedOut = 'loggedOut',
  Authorization = 'authorization',
  LoggedIn = 'loggedIn',
}

export interface IAuthState {
  authStatus: EAuthStatus;
}

export const authSlice = createFeatureSelector<IAuthState>('auth');
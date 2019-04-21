import {createFeatureSelector} from "@ngrx/store";

export enum EAuthStatus {
  LoggedOut = 'loggedOut',
  Authorization = 'authorization',
  LoggedIn = 'loggedIn',
  Refresh = 'refresh',
}

export interface IAuthState {
  authStatus: EAuthStatus;
}

export const initialAuthState: IAuthState = {
  authStatus: EAuthStatus.LoggedOut,
};

export const authSlice = createFeatureSelector<IAuthState>('auth');
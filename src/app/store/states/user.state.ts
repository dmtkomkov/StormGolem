import { createFeatureSelector } from "@ngrx/store";
import { IUser } from "@interfaces";

export interface IUserState {
  user: IUser;
  loading: boolean;
}

export const initialUserState: IUserState = {
  user: null,
  loading: false,
};

export const userSlice = createFeatureSelector<IUserState>('user');
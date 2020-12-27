import { IAuthState, IUserState } from "@store/states";

export interface IAppState {
  auth: IAuthState;
  user: IUserState;
}
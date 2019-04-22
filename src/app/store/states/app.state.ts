import { IBlogState, IAuthState, IUserState } from "@store/states";

export interface IAppState {
  blog: IBlogState;
  auth: IAuthState;
  user: IUserState;
}
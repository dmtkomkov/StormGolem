import { IBlogState } from "./blog.state";
import { IAuthState } from "./auth.state";
import { IUserState } from "./user.state";

export interface IAppState {
  blog: IBlogState;
  auth: IAuthState;
  user: IUserState;
}
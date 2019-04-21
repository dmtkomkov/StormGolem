import { IBlogState } from "./blog.state";
import { IAuthState } from "./auth.state";
import { IUserState } from "./user.state";

// TODO: import from index.ts
export interface IAppState {
  blog: IBlogState;
  auth: IAuthState;
  user: IUserState;
}
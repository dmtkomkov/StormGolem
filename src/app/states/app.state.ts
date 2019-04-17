import { IBlogState } from "./blog.state";
import { IUserState } from "./user.state";

export interface IAppState {
  blog: IBlogState;
  user: IUserState;
}
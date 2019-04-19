import { IBlogState } from "./blog.state";
import { IAccessState } from "./access.state";

export interface IAppState {
  blog: IBlogState;
  access: IAccessState;
}
import { Action } from "@ngrx/store/src/models";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  GetBlogPosts = '[Blog] Get Blog Posts',
  GetBlogPostsSuccess = '[Blog] Get Blog Posts Success',
}

export class GetBlogPosts implements Action {
  public readonly type = EBlogAction.GetBlogPosts;
}

export class GetBlogPostsSuccess implements Action {
  public readonly type = EBlogAction.GetBlogPostsSuccess;
  constructor(public payload: IBlogPost[]) { }
}

export type BlogAction = GetBlogPosts  | GetBlogPostsSuccess;
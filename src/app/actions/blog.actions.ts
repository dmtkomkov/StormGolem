import { Action } from "@ngrx/store/src/models";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  GetBlogPosts = '[Blog] Get Blog Posts',
  GetBlogPostsSuccess = '[Blog] Get Blog Posts Success',
  GetBlogPostsError = '[Blog] Get Blog Posts Error',
}

export class GetBlogPosts implements Action {
  public readonly type = EBlogAction.GetBlogPosts;
}

export class GetBlogPostsSuccess implements Action {
  public readonly type = EBlogAction.GetBlogPostsSuccess;
  constructor(public payload: IBlogPost[]) { }
}

export class GetBlogPostsError implements Action {
  public readonly type = EBlogAction.GetBlogPostsError;
}

export type BlogAction = GetBlogPosts  | GetBlogPostsSuccess | GetBlogPostsError;
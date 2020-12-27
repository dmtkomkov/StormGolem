import { Action } from "@ngrx/store";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  LoadBlogPosts = '[Blog] Load Blog Posts',
  LoadBlogPostsSuccess = '[Blog] Load Blog Posts Success',
  LoadBlogPostsError = '[Blog] Load Blog Posts Error',

  ResetBlog = '[Blog] Reset Blog',
}

export class LoadBlogPosts implements Action {
  public readonly type = EBlogAction.LoadBlogPosts;
  constructor(public reload: boolean = true) { }
}

export class LoadBlogPostsSuccess implements Action {
  public readonly type = EBlogAction.LoadBlogPostsSuccess;
  constructor(public payload: IBlogPost[], public reload: boolean) { }
}

export class LoadBlogPostsError implements Action {
  public readonly type = EBlogAction.LoadBlogPostsError;
}

export class ResetBlog implements Action {
  public readonly type = EBlogAction.ResetBlog;
}

export type BlogAction = LoadBlogPosts | LoadBlogPostsSuccess | LoadBlogPostsError | ResetBlog

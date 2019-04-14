import { Action } from "@ngrx/store/src/models";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  LoadBlogPosts = '[Blog] Load Blog Posts',
  LoadBlogPostsSuccess = '[Blog] Load Blog Posts Success',
  LoadBlogPostsError = '[Blog] Load Blog Posts Error',
  SelectBlogPost = '[Blog] Select Blog Post',
  ResetBlog = '[Blog] Reset Blog',
}

export class LoadBlogPosts implements Action {
  public readonly type = EBlogAction.LoadBlogPosts;
}

export class LoadBlogPostsSuccess implements Action {
  public readonly type = EBlogAction.LoadBlogPostsSuccess;
  constructor(public payload: IBlogPost[]) { }
}

export class LoadBlogPostsError implements Action {
  public readonly type = EBlogAction.LoadBlogPostsError;
}

export class SelectBlogPost implements Action {
  public readonly type = EBlogAction.SelectBlogPost;
  constructor(public payload: number) { }
}

export class ResetBlog implements Action {
  public readonly type = EBlogAction.ResetBlog;
}

export type BlogAction = LoadBlogPosts  | LoadBlogPostsSuccess | LoadBlogPostsError | SelectBlogPost | ResetBlog;
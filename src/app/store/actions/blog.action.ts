import { Action } from "@ngrx/store";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  LoadBlogPosts = '[Blog] Load Blog Posts',
  LoadBlogPostsSuccess = '[Blog] Load Blog Posts Success',
  LoadBlogPostsError = '[Blog] Load Blog Posts Error',

  CreateBlogPost = '[Blog] Create Blog Post',
  CreateBlogPostSuccess = '[Blog] Create Blog Post Success',
  CreateBlogPostError = '[Blog] Create Blog Post Error',

  UpdateBlogPost = '[Blog] Update Blog Post',
  UpdateBlogPostSuccess = '[Blog] Update Blog Post Success',
  UpdateBlogPostError = '[Blog] Update Blog Post Error',

  DeleteBlogPost = '[Blog] Delete Blog Post',
  DeleteBlogPostSuccess = '[Blog] Delete Blog Post Success',
  DeleteBlogPostError = '[Blog] Delete Blog Post Error',

  SelectBlogPost = '[Blog] Select Blog Post',
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

export class CreateBlogPost implements Action {
  public readonly type = EBlogAction.CreateBlogPost;
  constructor(public payload: IBlogPost) { }
}

export class CreateBlogPostSuccess implements Action {
  public readonly type = EBlogAction.CreateBlogPostSuccess;
}

export class CreateBlogPostError implements Action {
  public readonly type = EBlogAction.CreateBlogPostError;
}

export class UpdateBlogPost implements Action {
  public readonly type = EBlogAction.UpdateBlogPost;
  constructor(public payload: IBlogPost) { }
}

export class UpdateBlogPostSuccess implements Action {
  public readonly type = EBlogAction.UpdateBlogPostSuccess;
}

export class UpdateBlogPostError implements Action {
  public readonly type = EBlogAction.UpdateBlogPostError;
}

export class DeleteBlogPost implements Action {
  public readonly type = EBlogAction.DeleteBlogPost;
  constructor(public payload: number) { }
}

export class DeleteBlogPostSuccess implements Action {
  public readonly type = EBlogAction.DeleteBlogPostSuccess;
}

export class DeleteBlogPostError implements Action {
  public readonly type = EBlogAction.DeleteBlogPostError;
}

export class SelectBlogPost implements Action {
  public readonly type = EBlogAction.SelectBlogPost;
  constructor(public payload: number) { }
}

export class ResetBlog implements Action {
  public readonly type = EBlogAction.ResetBlog;
}

export type BlogAction = LoadBlogPosts | LoadBlogPostsSuccess | LoadBlogPostsError |
  CreateBlogPost | CreateBlogPostSuccess | CreateBlogPostError |
  UpdateBlogPost | UpdateBlogPostSuccess | UpdateBlogPostError |
  DeleteBlogPost | DeleteBlogPostSuccess | DeleteBlogPostError |
  SelectBlogPost | ResetBlog

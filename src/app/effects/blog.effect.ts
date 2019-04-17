import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from "rxjs";
import {
  EBlogAction,
  BlogAction,
  LoadBlogPosts,
  LoadBlogPostsSuccess,
  LoadBlogPostsError,
  CreateBlogPost,
  CreateBlogPostError,
  CreateBlogPostSuccess,
  UpdateBlogPost,
  UpdateBlogPostSuccess,
  UpdateBlogPostError,
  DeleteBlogPost,
  DeleteBlogPostSuccess,
  DeleteBlogPostError,
} from "../actions/blog.actions";
import { BlogService } from "@services/blog.service";
import { IBlogPage, IBlogPost } from "@interfaces";
import { selectBlogPost } from "../helpers/blog.helpers";

const EMPTY_BLOG_POST: IBlogPost = {id: 0, title: '', body: '', selected: false};

@Injectable()
export class BlogEffect {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) { }

  @Effect() loadBlogPosts$ = this.actions$.pipe(
    ofType<BlogAction>(EBlogAction.LoadBlogPosts),
    concatMap(() => this.blogService.getBlogPage()
      .pipe(
        map((blogPage: IBlogPage) => blogPage.results),
        map((blogPosts: IBlogPost[]) => [EMPTY_BLOG_POST].concat(selectBlogPost(blogPosts, NaN))),
        map((blogPosts: IBlogPost[]) => new LoadBlogPostsSuccess(blogPosts)),
        catchError(() => of(new LoadBlogPostsError())),
      )
    ),
  );

  @Effect() createBlogPost = this.actions$.pipe(
    ofType<BlogAction>(EBlogAction.CreateBlogPost),
    concatMap((action: CreateBlogPost) => this.blogService.createBlogPost(action.payload)
      .pipe(
        map(() => new CreateBlogPostSuccess()),
        catchError(() => of(new CreateBlogPostError())),
      )
    ),
  );

  @Effect() updateBlogPost = this.actions$.pipe(
    ofType<BlogAction>(EBlogAction.UpdateBlogPost),
    concatMap((action: UpdateBlogPost) => this.blogService.updateBlogPost(action.payload)
      .pipe(
        map(() => new UpdateBlogPostSuccess()),
        catchError(() => of(new UpdateBlogPostError())),
      )
    ),
  );

  @Effect() deleteBlogPost = this.actions$.pipe(
    ofType<BlogAction>(EBlogAction.DeleteBlogPost),
    concatMap((action: DeleteBlogPost) => this.blogService.deleteBlogPost(action.payload)
      .pipe(
        map(() => new DeleteBlogPostSuccess()),
        catchError(() => of(new DeleteBlogPostError())),
      )
    ),
  );

  @Effect() reloadBlogPosts$ = this.actions$.pipe(
    ofType<BlogAction>(
      EBlogAction.CreateBlogPostSuccess,
      EBlogAction.UpdateBlogPostSuccess,
      EBlogAction.DeleteBlogPostSuccess,
    ),
    map(() => new LoadBlogPosts()),
  );
}
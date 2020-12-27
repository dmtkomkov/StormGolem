import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  EBlogAction,
  BlogAction,
  LoadBlogPosts,
  LoadBlogPostsSuccess,
  LoadBlogPostsError,
} from "@store/actions";
import { BlogService } from "@services";
import { IBlogPage, IBlogPost } from "@interfaces";

import { of } from "rxjs";
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable()
export class BlogEffect {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) { }

  @Effect() loadBlogPosts$ = this.actions$.pipe(
    ofType<BlogAction>(EBlogAction.LoadBlogPosts),
    concatMap((action: LoadBlogPosts) => this.blogService.getBlogPage(action.reload)
      .pipe(
        map((blogPage: IBlogPage) => blogPage.results),
        map((blogPosts: IBlogPost[]) => new LoadBlogPostsSuccess(blogPosts, action.reload)),
        catchError(() => of(new LoadBlogPostsError())),
      )
    ),
  );
}

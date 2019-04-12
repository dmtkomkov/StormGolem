import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from "rxjs/internal/observable/of";
import { EBlogAction } from "../actions/blog.actions";
import { BlogService } from "@services/blog.service";
import { LoadBlogPostsSuccess, LoadBlogPostsError } from "../actions/blog.actions";
import { IBlogPage } from "@interfaces";

@Injectable()
export class BlogEffect {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) {}

  @Effect()
  loadBlogPosts$ = this.actions$.pipe(
    ofType(EBlogAction.LoadBlogPosts),
    concatMap(() => this.blogService.getBlogPage()
      .pipe(
        map((blogPage: IBlogPage) => (new LoadBlogPostsSuccess(blogPage.results))),
        catchError(() => of(new LoadBlogPostsError())),
      )
    ),
  );
}
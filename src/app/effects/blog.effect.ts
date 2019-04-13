import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from "rxjs";
import { EBlogAction } from "../actions/blog.actions";
import { BlogService } from "@services/blog.service";
import { LoadBlogPostsSuccess, LoadBlogPostsError } from "../actions/blog.actions";
import { IBlogPage, IBlogPost } from "@interfaces";
import { selectBlogPost } from "../helpers/blog.helpers";

const EMPTY_BLOG_POST: IBlogPost = {id: 0, title: '', body: '', selected: false};

@Injectable()
export class BlogEffect {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) { }

  @Effect()
  loadBlogPosts$ = this.actions$.pipe(
    ofType(EBlogAction.LoadBlogPosts),
    concatMap(() => this.blogService.getBlogPage()
      .pipe(
        map((blogPage: IBlogPage) => blogPage.results),
        map((blogPosts: IBlogPost[]) => [EMPTY_BLOG_POST].concat(selectBlogPost(blogPosts, NaN))),
        map((blogPosts: IBlogPost[]) => (new LoadBlogPostsSuccess(blogPosts))),
        catchError(() => of(new LoadBlogPostsError())),
      )
    ),
  );
}
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { BehaviorSubject, Observable, Subscription, merge, of } from 'rxjs';
import {catchError, map, switchMap, take} from "rxjs/operators";

import { IBlogPost, IBlogPage } from '@interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from "../state/app.state";
import {EBlogAction} from "../actions/blog.actions";
import {tap} from "rxjs/internal/operators/tap";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogState: Subscription;
  blogPageNumber$: BehaviorSubject<number>;
  blogPageContent$: Observable<IBlogPost[]>;
  selectedBlogPost: number;
  emptyBlogPost: IBlogPost;
  pageRefresh: Subscription;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) {
    this.blogPageNumber$ = new BehaviorSubject(0);
    this.emptyBlogPost = {id: 0, title: '', body: ''};
  }

  ngOnInit() {
    this.blogState = this.store.select(state => state).pipe(
      tap(result => console.log('select result:', result))
    ).subscribe();
    this.blogPageContent$ = this.blogPageNumber$.asObservable().pipe(
      switchMap(() => this.blogService.getBlogPage().pipe(
        catchError(() => of({results: null})), // Return page with null results on error
        take(1),
      )),
      map((blogPage: IBlogPage): IBlogPost[] => blogPage.results),
    );
    this.pageRefresh = merge(this.authService.loggedIn$, this.blogService.action$).subscribe(() => {
      this.store.dispatch({ type: EBlogAction.GetBlogPosts });
      this.selectBlogPost(NaN);
      this.blogPageNumber$.next(0);
    });
  }

  ngOnDestroy(): void {
    this.pageRefresh.unsubscribe();
    this.blogState.unsubscribe();
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

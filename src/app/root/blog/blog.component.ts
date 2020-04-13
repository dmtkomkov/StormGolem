import {Component, OnDestroy, OnInit} from '@angular/core';

import { BlogService } from '@services';

import {IBlogPost} from '@interfaces';

import { Store } from '@ngrx/store';
import { LoadBlogPosts, ResetBlog } from "@store/actions";
import { IAppState, blogPostsSlice, authSlice } from "@store/states";

import { Observable, Subscription } from 'rxjs';
import { handleAuthStatus, getAuthStatus } from "@shared/helpers/auth.helpers";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private statusSubscription: Subscription;
  activePage: number = 1;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.select(blogPostsSlice);
    this.statusSubscription = this.store.select(authSlice).pipe(
      getAuthStatus(),
      handleAuthStatus(
        () => this.store.dispatch(new LoadBlogPosts({ activePage: 1 })),
        () => this.store.dispatch(new ResetBlog()),
      )
    ).subscribe();
    this.store.dispatch(new LoadBlogPosts({ activePage: this.activePage }));
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetBlog());
    this.statusSubscription.unsubscribe();

  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

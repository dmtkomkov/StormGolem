import {Component, OnDestroy, OnInit} from '@angular/core';

import { BlogService } from '@services';

import {IBlogPost} from '@interfaces';

import { Store } from '@ngrx/store';
import { LoadBlogPosts, ResetBlog } from "@store/actions";
import { IAppState, blogPostsSlice, authSlice, IAuthState, EAuthStatus } from "@store/states";

import { Observable, Subscription } from 'rxjs';
import { tap } from "rxjs/operators";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private statusSubscription: Subscription;
  private pageLoaded = false;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.select(blogPostsSlice).pipe(
      tap((blogPosts: IBlogPost[]) => {
        if (blogPosts !== null && this.pageLoaded === false) {
          this.pageLoaded = true;
        }
      })
    );

    // Load blog at first place
    this.store.dispatch(new LoadBlogPosts());

    // Load blog on login
    this.statusSubscription = this.store.select(authSlice).subscribe((authState: IAuthState) => {
      if (authState.authStatus === EAuthStatus.LoggedIn && this.pageLoaded === false) {
        this.store.dispatch(new LoadBlogPosts());
      }
    });
  }

  ngOnDestroy() {
    this.blogService.resetPage();
    this.store.dispatch(new ResetBlog());
    this.statusSubscription.unsubscribe();
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }

  loadNextPage() {
    this.blogService.nextPage();
    this.store.dispatch(new LoadBlogPosts(false));
  }
}

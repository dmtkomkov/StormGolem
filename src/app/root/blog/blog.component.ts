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
  private actionSubscription: Subscription;
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

    // Subscribe blog actions
    this.actionSubscription = this.blogService.getBlogActions().subscribe(
      (action) => {
        let serviceAction = null;
        switch(action.action) {
          case 'create': {
            serviceAction = this.blogService.createBlogPost(action.payload);
            break;
          }
          case 'update': {
            serviceAction = this.blogService.updateBlogPost(action.payload);
            break;
          }
          case 'delete': {
            serviceAction = this.blogService.deleteBlogPost(action.payload);
            break;
          }
        }
        serviceAction.subscribe(
          () => this.store.dispatch(new LoadBlogPosts()),
        )
      },
    )


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
    this.actionSubscription.unsubscribe();
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }

  loadNextPage() {
    this.blogService.nextPage();
    this.store.dispatch(new LoadBlogPosts(false));
  }
}

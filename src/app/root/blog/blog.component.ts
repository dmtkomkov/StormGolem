import {Component, OnDestroy, OnInit} from '@angular/core';

import {BlogService} from '../../shared/services/blog.service';

import {Observable, Subscription} from 'rxjs';

import {IBlogPost} from '@interfaces';
import {Store} from '@ngrx/store';
import {IAppState} from "../../store/states/app.state";
import {LoadBlogPosts, ResetBlog} from "../../store/actions/blog.actions";
import {blogPostsSlice} from "../../store/states/blog.state";
import {EAuthStatus, authSlice, IAuthState} from "../../store/states/auth.state";
import {map, skip} from "rxjs/operators";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private statusSubscription: Subscription;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.select(blogPostsSlice);
    this.statusSubscription = this.store.select(authSlice).pipe(
      skip(1),
      map((authState: IAuthState) => authState.authStatus),
    ).subscribe((status: EAuthStatus) => {
      switch (status) {
        case EAuthStatus.LoggedIn: { this.store.dispatch(new LoadBlogPosts()); break; }
        case EAuthStatus.LoggedOut: { this.store.dispatch(new ResetBlog()); break; }
      }
    });
    this.store.dispatch(new LoadBlogPosts());
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetBlog());
    this.statusSubscription.unsubscribe();

  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';

import {BlogService} from '@services/blog.service';

import {Observable, Subscription} from 'rxjs';

import {IBlogPost} from '@interfaces';
import {Store} from '@ngrx/store';
import {IAppState} from "../states/app.state";
import {LoadBlogPosts, ResetBlog} from "../actions/blog.actions";
import {blogPostsSlice} from "../states/blog.state";
import {EAccessStatus, statusSlice} from "../states/access.state";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private userSubscription: Subscription;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.select(blogPostsSlice);
    this.userSubscription = this.store.select(statusSlice).subscribe((status: EAccessStatus) => {
      switch (status) {
        case EAccessStatus.LoggedIn: { this.store.dispatch(new LoadBlogPosts()); break; }
        case EAccessStatus.LoggedOut: { this.store.dispatch(new ResetBlog()); break; }
      }
    });
    this.store.dispatch(new LoadBlogPosts());
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetBlog());
    this.userSubscription.unsubscribe();

  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

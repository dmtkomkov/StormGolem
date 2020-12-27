import {Component, OnDestroy, OnInit} from '@angular/core';

import { BlogService } from '@services';

import { IBlogPage, IBlogPost } from '@interfaces';

import { Store } from '@ngrx/store';
import { IAppState, authSlice, IAuthState, EAuthStatus } from "@store/states";

import { Subscription } from 'rxjs';

const EMPTY_BLOG_POST: IBlogPost = { id: 0, title: '', body: '' };

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription;
  private actionSubscription: Subscription;
  private pageLoaded = false;
  private pageNumber: number;
  selectedPostId: number;
  blogPosts: IBlogPost[]

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) {
    this.pageNumber = 1;
    this.blogPosts = [];
  }

  ngOnInit() {
    // Load blog at first place
    this.loadBlogPosts();

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
          () => {
            this.loadBlogPosts(true);
          },
        )
      },
    )

    // Load blog on login
    this.statusSubscription = this.store.select(authSlice).subscribe((authState: IAuthState) => {
      if (authState.authStatus === EAuthStatus.LoggedIn && this.pageLoaded === false) {
        this.loadBlogPosts();
      }
    });
  }

  loadBlogPosts(resetSelected: boolean = false) {
    this.blogService.getBlogPages(this.pageNumber).subscribe(
      (blogPage: IBlogPage) => {
        this.blogPosts = [EMPTY_BLOG_POST].concat(blogPage.results);
        if (resetSelected) {
          this.selectedPostId = NaN;
        }
      }
    )
  }

  addBlogPosts() {
    this.blogService.getBlogPage(this.pageNumber).subscribe(
      (blogPage: IBlogPage) => {
        this.blogPosts = this.blogPosts.concat(blogPage.results);
      }
    )
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
    this.actionSubscription.unsubscribe();
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }

  loadNextPage() {
    this.pageNumber += 1;
    this.addBlogPosts();
  }

  togglePost(id: number) {
    this.selectedPostId = id;
  }
}

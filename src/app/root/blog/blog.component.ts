import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { BlogService } from '@services';

import { IBlogPage, IBlogPost } from '@interfaces';

import { Store } from '@ngrx/store';
import { IAppState, authSlice, IAuthState, EAuthStatus } from "@store/states";

import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {catchError, distinctUntilChanged, mergeMap} from "rxjs/operators";

const EMPTY_BLOG_POST: IBlogPost = { id: 0, title: '', body: '' };

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;
  private statusSubscription: Subscription;
  private actionSubscription: Subscription;
  private pageCount: number;
  selectedPostId: number;
  blogPosts: IBlogPost[];
  nextPage$ = new Subject<number>();
  nextPageSub: Subscription;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) {
    this.pageCount = 0;
    this.blogPosts = [];
  }

  ngOnInit() {
    // Handle page switch
    this.handleNextPage();

    // Subscribe blog actions
    this.handleBlogOnActions();

    // Load blog on login
    this.handleBlogOnLogin();
  }

  private handleBlogOnActions() {
    this.actionSubscription = this.blogService.getBlogActions().subscribe(
      (action) => {
        let serviceAction: Observable<IBlogPost|{}>;
        switch(action.name) {
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
            this.loadFirstPage();
          },
        )
      },
    )
  }

  onScroll() {
    if (this.viewport.measureScrollOffset('bottom') < 200) {
      this.nextPage$.next(this.pageCount + 1);
    }
  }

  private handleNextPage() {
    this.nextPageSub = this.nextPage$.pipe(
        distinctUntilChanged(),
        mergeMap((nextPageNumber: number) => this.blogService.getBlogPage(nextPageNumber).pipe(
            catchError(() => EMPTY), // TODO: ensure 404 error
        )),
    ).subscribe((blogPage: IBlogPage) => {
      this.blogPosts = [...this.blogPosts, ...blogPage.results];
      this.pageCount++;
    });
  }

  private handleBlogOnLogin() {
    this.statusSubscription = this.store.select(authSlice).subscribe((authState: IAuthState) => {
      if (authState.authStatus === EAuthStatus.LoggedIn) {
        this.loadFirstPage();
      }
    });
  }

  private loadFirstPage() {
    this.blogService.getBlogPage(1).subscribe(
        (blogPage: IBlogPage) => {
          this.blogPosts = [EMPTY_BLOG_POST].concat(blogPage.results);
          this.pageCount = 1;
          this.selectedPostId = NaN;
        }
    )
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }

  togglePost(id: number) {
    this.selectedPostId = id;
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
    this.actionSubscription.unsubscribe();
    this.nextPageSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { BehaviorSubject, Observable, Subscription, merge, of } from 'rxjs';
import {catchError, map, switchMap, take} from "rxjs/operators";

import { IBlogPost, IBlogPage } from '@interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPageNumber$: BehaviorSubject<number>;
  blogPageContent$: Observable<IBlogPost[]>;
  selectedBlogPost: number;
  emptyBlogPost: IBlogPost;
  pageRefresh: Subscription;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
  ) {
    this.blogPageNumber$ = new BehaviorSubject(0);
    this.emptyBlogPost = {id: 0, title: '', body: ''};
  }

  ngOnInit() {
    this.blogPageContent$ = this.blogPageNumber$.asObservable().pipe(
      switchMap(() => this.blogService.getBlogPage().pipe(
        catchError(() => of({results: null})), // Return page with null results on error
        take(1),
      )),
      map((blogPage: IBlogPage): IBlogPost[] => blogPage.results),
    );
    this.pageRefresh = merge(this.authService.loggedIn$, this.blogService.action$).subscribe(() => {
      this.selectBlogPost(NaN);
      this.blogPageNumber$.next(0);
    });
  }

  ngOnDestroy(): void {
    this.pageRefresh.unsubscribe()
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

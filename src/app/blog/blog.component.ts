import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { BehaviorSubject, Observable, Subscription, merge, of } from 'rxjs';
import { catchError, map, switchMap } from "rxjs/operators";

import { BlogPost, BlogPage } from '@interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPageNumber$: BehaviorSubject<number>;
  blogPageContent$: Observable<BlogPost[]>;
  selectedBlogPost: number;
  emptyBlogPost: BlogPost;
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
            catchError(() => of({results: []})), // Return page with empty results on error
        )),
        map((blogPage: BlogPage): BlogPost[] => blogPage.results),
    );
    this.pageRefresh = merge(this.authService.loggedIn$, this.blogService.action$).subscribe(() => {
      this.refreshBlogPage();
    });
  }

  ngOnDestroy(): void {
    this.pageRefresh.unsubscribe()
  }

  refreshBlogPage() {
    this.selectBlogPost(NaN);
    this.readBlogPage(0);
  }

  readBlogPage(pageNumber: number) {
    this.blogPageNumber$.next(pageNumber);
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }

  trackByPostId(index: number, blogPost: BlogPost): number {
    return blogPost.id;
  }
}

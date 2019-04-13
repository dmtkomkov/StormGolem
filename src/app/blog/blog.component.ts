import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { Observable, merge, Subject} from 'rxjs';

import { IBlogPost } from '@interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from "../states/app.state";
import { select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { LoadBlogPosts } from "../actions/blog.actions";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private unsubsriber: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.pipe(
      takeUntil(this.unsubsriber),
      select((state: IAppState) => state.blog.blogPosts),
    );

    this.store.dispatch(new LoadBlogPosts());

    merge(this.authService.loggedIn$, this.blogService.action$).pipe(
      takeUntil(this.unsubsriber),
    ).subscribe(() => {
      this.store.dispatch(new LoadBlogPosts());
    });
  }

  ngOnDestroy(): void {
    this.unsubsriber.next();
    this.unsubsriber.complete();
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

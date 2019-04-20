import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';

import { Observable, Subject} from 'rxjs';

import { IBlogPost } from '@interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from "../states/app.state";
import { select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { LoadBlogPosts, ResetBlog } from "../actions/blog.actions";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  private unsubsriber: Subject<void> = new Subject();

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.pipe(
      takeUntil(this.unsubsriber),
      select((state: IAppState) => state.blog.blogPosts),
    );

    this.store.dispatch(new LoadBlogPosts());
  }

  ngOnDestroy(): void {
    this.unsubsriber.next();
    this.unsubsriber.complete();
    this.store.dispatch(new ResetBlog());
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

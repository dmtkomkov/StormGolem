import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';

import { Observable } from 'rxjs';

import { IBlogPost} from '@interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from "../states/app.state";
import { LoadBlogPosts, ResetBlog } from "../actions/blog.actions";
import { blogPostsSlice } from "../states/blog.state";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;

  constructor(
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.blogPageContent$ = this.store.select(blogPostsSlice);
    this.store.dispatch(new LoadBlogPosts());
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetBlog());
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}

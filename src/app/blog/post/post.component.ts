import { Component, Input } from '@angular/core';

import { IBlogPost } from '@interfaces';
import {SelectBlogPost} from "../../actions/blog.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../states/app.state";

@Component({
  selector: 'sg-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent {
  @Input() blogPost: IBlogPost;

  constructor(
    private store: Store<IAppState>,
  ) { }

  select() {
    this.store.dispatch(new SelectBlogPost(this.blogPost.id));
  }

  unselect() {
    this.store.dispatch(new SelectBlogPost(NaN));
  }
}

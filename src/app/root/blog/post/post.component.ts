import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IBlogPost } from '@interfaces';

@Component({
  selector: 'sg-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent {
  @Input() blogPost: IBlogPost;
  @Input() selected: boolean;
  @Output() selectPost = new EventEmitter<number>();

  select() {
    this.selectPost.emit(this.blogPost.id);
  }

  unselect() {
    this.selectPost.emit(NaN);
  }
}

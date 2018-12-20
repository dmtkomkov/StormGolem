import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BlogPost } from '@interfaces';

@Component({
  selector: 'sg-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent {
  @Input() blogPost: BlogPost;
  @Input() editMode: boolean;
  @Output() selectedBlogPost: EventEmitter<number> = new EventEmitter<number>();

  select() {
    this.selectedBlogPost.emit(this.blogPost.id);
  }

  unselect() {
    this.selectedBlogPost.emit(NaN);
  }
}

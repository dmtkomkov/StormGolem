import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogPost } from '@interfaces';

@Component({
  selector: 'sg-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() blogPost: BlogPost;
  @Input() editMode: boolean;
  @Output() selectedBlogPost: EventEmitter<number> = new EventEmitter<number>();
  blogPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [this.blogPost.title, Validators.required ],
      body: [this.blogPost.body, Validators.required ],
    });
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost.emit(blogPostId);
  }

  submit() {
    console.log('Update post!');
  }
}

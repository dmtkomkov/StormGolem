import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BlogService } from '@services/blog.service';

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
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [this.blogPost.title, Validators.required ],
      body: [this.blogPost.body, Validators.required ],
    });
  }

  select() {
    this.selectedBlogPost.emit(this.blogPost.id);
  }

  unselect() {
    this.selectedBlogPost.emit(null);
  }

  submit() {
    if (this.blogPost.id === 0) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.blogService.createBlogPost(this.blogPostForm.value).subscribe(
      () => {
        this.unselect();
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Create post failed: ', error.status, error.message);
      }
    );
  }

  update() {
    this.blogService.updateBlogPost(this.blogPost.id, this.blogPostForm.value).subscribe(
      () => {
        this.unselect();
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Update post failed: ', error.status, error.message);
      }
    );
  }

  delete() {
    this.blogService.deleteBlogPost(this.blogPost.id).subscribe(
      () => {
        this.unselect();
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Delete post failed: ', error.status, error.message);
      }
    );
  }
}

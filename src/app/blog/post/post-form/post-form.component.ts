import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BlogService } from '@services/blog.service';

@Component({
  selector: 'sg-post-form',
  templateUrl: 'post-form.component.html',
  styles: []
})
export class PostFormComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() body: string;
  blogPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: [ this.title, Validators.required ],
      body: [ this.body, Validators.required ],
    });
  }

  create() {
    this.blogService.createBlogPost(this.blogPostForm.value).subscribe(
      () => {
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Create post failed: ', error.status, error.message);
      }
    );
  }

  update() {
    this.blogService.updateBlogPost(this.id, this.blogPostForm.value).subscribe(
      () => {
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Update post failed: ', error.status, error.message);
      }
    );
  }

  delete() {
    this.blogService.deleteBlogPost(this.id).subscribe(
      () => {
        this.blogService.emitAction();
      },
      (error: HttpErrorResponse) => {
        console.log('Delete post failed: ', error.status, error.message);
      }
    );
  }

  submit() {
    if (this.id === 0) {
      this.create();
    } else {
      this.update();
    }
  }
}

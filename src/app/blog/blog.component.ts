import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs';

import { Post, BlogPage } from '../interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogPage$: Observable<BlogPage>;
  newDate: Date = new Date();
  postForm: FormGroup;
  isOpenedForm: boolean;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private fb: FormBuilder,
  ) {
    this.isOpenedForm = false;
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required ],
      body: ['', Validators.required ],
    });
    this.readBlogPage();
    this.authService.loggedIn$.subscribe(() => {
      this.readBlogPage();
    });
  }

  readBlogPage() {
    this.blogPage$ = this.blogService.getBlogPage();
    this.hidePostForm();
  }

  submit() {
    this.blogService.createPost(this.postForm.value).subscribe(
      (post: Post) => {
        console.log('created', post);
        this.readBlogPage();
      },
      (error: HttpErrorResponse) => {
        console.log('Create post failed: ', error.status, error.message);
      }
    );
  }

  showPostForm() {
    this.isOpenedForm = true;
  }

  hidePostForm() {
    this.isOpenedForm = false;
  }
}

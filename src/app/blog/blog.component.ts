import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { Observable } from 'rxjs';

import { BlogPost, BlogPage } from '@interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogPage$: Observable<BlogPage>;
  newDate: Date = new Date();
  blogPostForm: FormGroup;
  selectedBlogPost: number;
  emptyBlogPost: BlogPost;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
  ) {
    this.emptyBlogPost = {id: 0, title: '', body: ''};
  }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
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
  }

  submit() {
    this.blogService.createBlogPost(this.blogPostForm.value).subscribe(
      (blogPost: BlogPost) => {
        console.log('created', blogPost);
        this.readBlogPage();
      },
      (error: HttpErrorResponse) => {
        console.log('Create post failed: ', error.status, error.message);
      }
    );
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }
}

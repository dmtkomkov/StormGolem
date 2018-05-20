import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post, BlogPage } from '../interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  newDate: Date = new Date();
  postForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required ],
      body: ['', Validators.required ],
    });
    this.blogService.getBlogPage().subscribe(
      (blogPage: BlogPage) => {
        console.log(blogPage);
        this.posts = blogPage.results;
      },
      (error: HttpErrorResponse) => {
        console.log('Error Posts: ', error.message);
        this.posts = [];
      },
    )
  }
}

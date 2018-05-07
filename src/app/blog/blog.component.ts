import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Post, BlogPage } from '../interfaces';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit() {
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

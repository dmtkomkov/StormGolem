import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styles: [],
})
export class BlogComponent implements OnInit {
  posts: any = [];

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.blogService.getPosts().subscribe(
      blogPage => {
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

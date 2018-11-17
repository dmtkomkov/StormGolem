import { Component, OnInit } from '@angular/core';

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
  selectedBlogPost: number;
  emptyBlogPost: BlogPost;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
  ) {
    this.emptyBlogPost = {id: 0, title: '', body: ''};
  }

  ngOnInit() {
    this.readBlogPage();
    this.authService.loggedIn$.subscribe(() => {
      this.readBlogPage();
    });
  }

  readBlogPage() {
    this.blogPage$ = this.blogService.getBlogPage();
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }
}

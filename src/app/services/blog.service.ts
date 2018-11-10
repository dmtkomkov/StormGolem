import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BlogPost, BlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  constructor(
    private http: HttpClient,
  ) { }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add page number as a param
    return this.http.get<BlogPage>('/api/v1/blog/');
  }

  createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>('/api/v1/blog/', blogPost);
  }
}

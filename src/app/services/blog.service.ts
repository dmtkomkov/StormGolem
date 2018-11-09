import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post, BlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  constructor(
    private http: HttpClient,
  ) { }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add page number as a param
    return this.http.get<BlogPage>('/api/v1/blog/');
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('/api/v1/blog/', post);
  }
}

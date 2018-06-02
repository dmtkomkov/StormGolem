import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service'

import { Observable } from 'rxjs';

import { Post, BlogPage } from '../interfaces';

@Injectable()
export class BlogService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add page number as a param
    return this.http.get<BlogPage>('http://localhost:8000/api/v1/blog/');
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8000/api/v1/blog/', post);
  }
}

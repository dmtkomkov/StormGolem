import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service'

import { Observable } from 'rxjs';

import { Post, BlogPage } from '../interfaces';

@Injectable()
export class BlogService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private getAuthHeaders(token: string): HttpHeaders {
    // Inject JWT token to request
    return new HttpHeaders({ Authorization: `JWT ${token}`});
  }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add pagenumber as a param
    return this.http.get<BlogPage>('http://localhost:8000/api/v1/blog/', {
      headers: this.getAuthHeaders(this.authService.getToken())
    });
  }

  createPost(post: Post): Observable<any> {
    // FIXME: any response?
    console.log('create post', post);
    return this.http.post('http://localhost:8000/api/v1/blog/', post, {
      headers: this.getAuthHeaders(this.authService.getToken())
    });
  }
}

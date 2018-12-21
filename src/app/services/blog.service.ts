import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import { BlogPost, BlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  private baseUrl: string = 'blog';
  action$: Subject<string>

  constructor(
    private http: HttpClient,
  ) {
    this.action$ = new Subject<string>();
  }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add page number as a param
    return this.http.get<BlogPage>(this.baseUrl);
  }

  createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.baseUrl, blogPost);
  }

  updateBlogPost(blogPostId: number, blogPost: BlogPost): Observable<BlogPost> {
    const url = Location.joinWithSlash(this.baseUrl, blogPostId.toString());
    return this.http.put<BlogPost>(url, blogPost);
  }

  deleteBlogPost(blogPostId: number): Observable<{}> {
    const url = Location.joinWithSlash(this.baseUrl, blogPostId.toString());
    return this.http.delete<{}>(url);
  }

  emitAction(action: string) {
    // Show snackbar
    this.action$.next(action);
  }
}

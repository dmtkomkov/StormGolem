import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import { IBlogPost, IBlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  private baseUrl: string = 'blog';
  action$: Subject<string>;

  constructor(
    private http: HttpClient,
  ) {
    this.action$ = new Subject<string>();
  }

  getBlogPage(): Observable<IBlogPage> {
    // FIXME: add page number as a param
    return this.http.get<IBlogPage>(this.baseUrl);
  }

  createBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
    return this.http.post<IBlogPost>(this.baseUrl, blogPost);
  }

  updateBlogPost(blogPostId: number, blogPost: IBlogPost): Observable<IBlogPost> {
    const url = Location.joinWithSlash(this.baseUrl, blogPostId.toString());
    return this.http.put<IBlogPost>(url, blogPost);
  }

  deleteBlogPost(blogPostId: number): Observable<{}> {
    const url = Location.joinWithSlash(this.baseUrl, blogPostId.toString());
    return this.http.delete<{}>(url);
  }

  emitAction(action: string) {
    // Show snackbar
    console.log(action);
    this.action$.next(action);
  }
}

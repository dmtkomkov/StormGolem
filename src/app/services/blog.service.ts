import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import { IBlogPost, IBlogPage, IBlogPostAction } from '@interfaces';

export const PAGE_SIZE = 10;

@Injectable({providedIn: 'root'})
export class BlogService {
  private baseUrl: string = 'blog';
  private pageSize: number;
  private blogActions$ = new Subject<IBlogPostAction>();

  constructor(
    private http: HttpClient,
  ) {
    this.pageSize = PAGE_SIZE;
  }

  getBlogActions(): Observable<IBlogPostAction> {
    return this.blogActions$;
  }

  sendBlogAction(name: string, payload: IBlogPost) {
    this.blogActions$.next({name, payload});
  }

  getBlogPage(pageNumber: number): Observable<IBlogPage> {
    let params: HttpParams;
    params = new HttpParams().set('limit', this.pageSize.toString()).set('page', pageNumber.toString());
    return this.http.get<IBlogPage>(this.baseUrl, { params });
  }

  getBlogPages(pageNumber: number): Observable<IBlogPage> {
    let params: HttpParams;
    params = new HttpParams().set('limit', (this.pageSize * pageNumber).toString());
    return this.http.get<IBlogPage>(this.baseUrl, { params });
  }

  createBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
    return this.http.post<IBlogPost>(this.baseUrl, blogPost);
  }

  updateBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
    const url = Location.joinWithSlash(this.baseUrl, blogPost.id.toString());
    return this.http.put<IBlogPost>(url, blogPost);
  }

  deleteBlogPost(blogPost: IBlogPost): Observable<{}> {
    const url = Location.joinWithSlash(this.baseUrl, blogPost.id.toString());
    return this.http.delete<{}>(url);
  }
}

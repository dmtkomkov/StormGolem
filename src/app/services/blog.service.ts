import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { IBlogPost, IBlogPage } from '@interfaces';

@Injectable({providedIn: 'root'})
export class BlogService {
  private baseUrl: string = 'blog';

  constructor(
    private http: HttpClient,
  ) { }

  getBlogPage(activePage: number = 13): Observable<IBlogPage> {
    let params = new HttpParams().set('page', activePage.toString());
    return this.http.get<IBlogPage>(this.baseUrl, { params });
  }

  createBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
    return this.http.post<IBlogPost>(this.baseUrl, blogPost);
  }

  updateBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
    const url = Location.joinWithSlash(this.baseUrl, blogPost.id.toString());
    return this.http.put<IBlogPost>(url, blogPost);
  }

  deleteBlogPost(blogPostId: number): Observable<{}> {
    const url = Location.joinWithSlash(this.baseUrl, blogPostId.toString());
    return this.http.delete<{}>(url);
  }
}

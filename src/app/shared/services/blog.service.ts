import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { IBlogPost, IBlogPage } from '@interfaces';

@Injectable({providedIn: 'root'})
export class BlogService {
  private baseUrl: string = 'blog';

  constructor(
    private http: HttpClient,
  ) { }

  getBlogPage(): Observable<IBlogPage> {
    // FIXME: add page number as a param
    return this.http.get<IBlogPage>(this.baseUrl);
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

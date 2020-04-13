import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { IBlogPost, IBlogPage } from '@interfaces';

export const PAGE_SIZE = 5;

@Injectable({providedIn: 'root'})
export class BlogService {
  private baseUrl: string = 'blog';
  private pageSize: number;
  private pageNumber: number;

  constructor(
    private http: HttpClient,
  ) {
    this.pageSize = PAGE_SIZE;
    this.pageNumber = 1;
  }

  getBlogPage(reload: boolean): Observable<IBlogPage> {
    let params: HttpParams;
    if (reload) {
      params = new HttpParams().set('limit', (this.pageSize * this.pageNumber).toString()).set('page', '1');
    } else {
      params = new HttpParams().set('limit', this.pageSize.toString()).set('page', this.pageNumber.toString());
    }
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

  nextPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }
}

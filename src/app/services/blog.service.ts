import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { BlogPost, BlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  action$: Subject<string>

  constructor(
    private http: HttpClient,
  ) {
    this.action$ = new Subject<string>();
  }

  getBlogPage(): Observable<BlogPage> {
    // FIXME: add page number as a param
    return this.http.get<BlogPage>('/api/v1/blog/');
  }

  createBlogPost(blogPost: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>('/api/v1/blog/', blogPost);
  }

  updateBlogPost(blogPostId: number, blogPost: BlogPost): Observable<BlogPost> {
    blogPost.id = blogPostId;
    // FIXME: find lib to join url
    return this.http.put<BlogPost>('/api/v1/blog/' + blogPostId + '/', blogPost);
  }

  deleteBlogPost(blogPostId: number): Observable<{}> {
    return this.http.delete<{}>('/api/v1/blog/' + blogPostId + '/');
  }

  emitAction(action: string) {
    this.action$.next(action);
  }
}

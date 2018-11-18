import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { BlogPost, BlogPage } from '@interfaces';

@Injectable()
export class BlogService {
  private actionSource: Subject<boolean>
  action$: Observable<boolean>

  constructor(
    private http: HttpClient,
  ) {
    this.actionSource = new Subject<boolean>();
    this.action$ = this.actionSource.asObservable();
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

  deleteBlogPost(blogPostId: number) {
    return this.http.delete('/api/v1/blog/' + blogPostId + '/');
  }

  emitAction() {
    this.actionSource.next(true);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { IGoalPage, IWorkLog } from "@root/goal/goal.interfaces";

// TODO: move to const file
export const PAGE_SIZE = 20;

@Injectable({providedIn: 'root'})
export class GoalService {
  private baseUrl: string = 'goal';
  private pageSize: number;
  private workLogUpdateData$ = new Subject<IWorkLog>();
  // private blogActions$ = new Subject<IBlogPostAction>();

  constructor(
    private http: HttpClient,
  ) {
    this.pageSize = PAGE_SIZE;
  }

  sendUpdateData(workLog: IWorkLog) {
    this.workLogUpdateData$.next(workLog);
  }

  getUpdateData(): Observable<IWorkLog> {
    return this.workLogUpdateData$
  }

  getGoalPage(pageNumber: number): Observable<IGoalPage> {
    let params: HttpParams;
    params = new HttpParams().set('limit', this.pageSize.toString()).set('page', pageNumber.toString());
    return this.http.get<IGoalPage>(this.baseUrl, { params });
  }

  getLabels(): Observable<any> {
    return this.http.get<any>('label');
  }

  // getBlogPages(pageNumber: number): Observable<IBlogPage> {
  //   let params: HttpParams;
  //   params = new HttpParams().set('limit', (this.pageSize * pageNumber).toString());
  //   return this.http.get<IBlogPage>(this.baseUrl, { params });
  // }

  createWorkLog(workLog: IWorkLog): Observable<IWorkLog> {
    return this.http.post<IWorkLog>(this.baseUrl, workLog);
  }
  //
  // updateBlogPost(blogPost: IBlogPost): Observable<IBlogPost> {
  //   const url = Location.joinWithSlash(this.baseUrl, blogPost.id.toString());
  //   return this.http.put<IBlogPost>(url, blogPost);
  // }
  //
  // deleteBlogPost(blogPost: IBlogPost): Observable<{}> {
  //   const url = Location.joinWithSlash(this.baseUrl, blogPost.id.toString());
  //   return this.http.delete<{}>(url);
  // }
}

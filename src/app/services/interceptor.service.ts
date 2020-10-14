import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments';
import { catchError } from "rxjs/operators";
import { LogOut } from "@store/actions";
import { Store } from "@ngrx/store";
import { IAppState } from "@store/states";

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor {
  readonly baseUrl = environment.backend;
  readonly apiUrl = environment.backend + environment.api;

  constructor(
    private store: Store<IAppState>,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth header and set new url
    const token: string = localStorage.getItem('token');
    const modifiedRequest = request.clone({
      headers: token?
        new HttpHeaders({ Authorization: `JWT ${token}`}):
        new HttpHeaders({}),
      url: this.getModifiedUrl(request.url),
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.store.dispatch(new LogOut());
        }
        return throwError(error);
      }),
    );
  }

  private getModifiedUrl(url: string): string {
    if (url.startsWith('assets')) return url; // Do not modify assets url
    else if (url === 'auth') return this.baseUrl + url; // Use base url for auth
    else return this.apiUrl + url; // Use api url for all other requests
  }
}

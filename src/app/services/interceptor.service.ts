import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import {ITokenData} from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from '@environments';
import * as decode from "jwt-decode";
import {RefreshToken} from "../actions/auth.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../states/app.state";

@Injectable()
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

    // Check and refresh token if needed
    if (token && request.url !== 'auth' && request.url !== 'refresh' && !request.url.startsWith('assets')) {
      const current = Math.round(+new Date()/1000);
      const tokenData: ITokenData = decode(token);
      if (tokenData.exp - current < 600) {
        this.store.dispatch(new RefreshToken({token: token}));
      }
    }

    return next.handle(modifiedRequest);
  }

  private getModifiedUrl(url: string): string {
    if (url.startsWith('assets')) return url; // Do not modify assets url
    else if (url === 'auth' || url === 'refresh') return this.baseUrl + url; // Use base url for auth
    else return this.apiUrl + url; // Use api url for all other requests
  }
}

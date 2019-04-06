import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';

import { Token } from '@interfaces';
import { TokenDto } from '@interfaces';

import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';

import { Observable } from 'rxjs';

import { environment } from '@environments';

import * as decode from "jwt-decode";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  baseUrl: string;
  apiUrl: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
  ) {
    this.baseUrl = environment.backend;
    this.apiUrl = environment.backend + environment.api
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth header and set new url
    const modifiedRequest = request.clone({
      headers: this.getAuthHeaders(),
      url: this.getModifiedUrl(request.url),
    });

    if (request.url !== 'auth' && request.url !== 'refresh') {
      const token: Token = this.storageService.getToken();
      const current = Math.round(+new Date()/1000);
      if (token) {
        const tokenDto: TokenDto = decode(token.token);
        if (tokenDto.exp - current < 600) {
          this.authService.refresh();
        }
      }
    }

    return next.handle(modifiedRequest);
  }

  private getAuthHeaders(): HttpHeaders {
    const token: Token = this.storageService.getToken();
    return token?
      new HttpHeaders({ Authorization: `JWT ${token.token}`}):
      new HttpHeaders({});
  }

  private getModifiedUrl(url: string): string {
    if (url.startsWith('assets')) return url; // Do not modify assets url
    else if (url === 'auth' || url === 'refresh') return this.baseUrl + url; // Use base url for auth
    else return this.apiUrl + url; // Use api url for all other requests
  }
}

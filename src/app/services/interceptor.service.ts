import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth header
    const modifiedRequest = request.clone({ headers: this.getAuthHeaders() });

    return next.handle(modifiedRequest).pipe(
      tap(
        (response: HttpResponse<any>) => console.log('IRESPONSE', response),
        (error: HttpErrorResponse) => console.log('IERROR', error),
      ),
    );
  }

  private getAuthHeaders(): HttpHeaders {
    let token: string = sessionStorage.getItem('token');
    return new HttpHeaders({ Authorization: `JWT ${token}`});
  }
}

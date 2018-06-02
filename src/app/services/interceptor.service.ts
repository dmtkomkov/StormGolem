import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      //headers: request.headers.set('testheader', 'hi'),
    });

    return next.handle(modifiedRequest).pipe(
      tap(
        (response: HttpResponse<any>) => console.log('IRESPONSE', response),
        (error: HttpErrorResponse) => console.log('IERROR', error),
      ),
    );
  }
}

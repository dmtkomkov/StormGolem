import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private getAuthHeaders(token: string): HttpHeaders {
    // Inject JWT token to request
    return new HttpHeaders({ Authorization: `JWT ${token}`});
  }

  getPosts(): Observable<any> {
    return this.http.get('http://localhost:8000/api/v1/blog/', {
      headers: this.getAuthHeaders(this.authService.getToken())
    });
  }
}

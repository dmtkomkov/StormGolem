import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service'

import { Observable } from 'rxjs';

import { User } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private getAuthHeaders(token: string): HttpHeaders {
    // Inject JWT token to request
    return new HttpHeaders({ Authorization: `JWT ${token}`});
  }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8000/api/v1/user/', {
      headers: this.getAuthHeaders(this.authService.getToken())
    });
  }
}

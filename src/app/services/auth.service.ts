import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

interface LoginUser {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  auth(loginUser: LoginUser): Observable<any> {
    return this.http.post('http://localhost:8000/auth/', loginUser);
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }
}

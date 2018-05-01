import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // Send authentication request
  auth(loginUser: LoginUser): Observable<any> {
    return this.http.post('http://localhost:8000/auth/', loginUser);
  }

  // Store user information
  login(token: string) {
    this.storeToken(token);
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }
}

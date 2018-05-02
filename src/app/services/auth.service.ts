import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { LoginUser, Token } from '../interfaces';

@Injectable()
export class AuthService {
  loggedIn: boolean;

  constructor(
    private http: HttpClient,
  ) {
    this.loggedIn = this.getToken()? true: false;
  }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('http://localhost:8000/auth/', loginUser).do(
      data => {
        this.setToken(data.token);
        this.loggedIn = true;
      },
      error => {
        this.setToken(null);
        this.loggedIn = false;
      },
    );
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }
}

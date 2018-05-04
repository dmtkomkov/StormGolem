import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';

import { LoginUser, Token } from '../interfaces';

@Injectable()
export class AuthService {
  private loggedInSource:  Subject<boolean>
  loggedIn$: Observable<boolean>

  constructor(
    private http: HttpClient,
  ) {
    this.loggedInSource = new Subject<boolean>();
    this.loggedIn$ = this.loggedInSource.asObservable();
  }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('http://localhost:8000/auth/', loginUser).do(
      data => {
        this.setToken(data.token);
        this.loggedInSource.next(true);
      },
      error => {
        this.setToken(null);
        this.loggedInSource.next(false);
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

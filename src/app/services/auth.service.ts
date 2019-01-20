import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { LoginUser, Token } from '@interfaces';

@Injectable()
export class AuthService {
  loggedIn$: Subject<boolean>

  constructor(
    private http: HttpClient,
  ) {
    this.loggedIn$ = new Subject<boolean>();
  }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('auth', loginUser);
  }

  // Refresh token
  refresh() {
    const token: string = sessionStorage.getItem('token');
    this.http.post<Token>('refresh', {'token': token}).subscribe((data: Token) => {
      this.setToken(data.token);
    });
  }

  logIn(token: string) {
    this.setToken(token);
    this.loggedIn$.next(true);
  }

  logOut() {
    this.setToken(null);
    this.loggedIn$.next(false);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}

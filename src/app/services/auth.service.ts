import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { LoginUser, Token } from '@interfaces';

import * as decode from "jwt-decode";

@Injectable()
export class AuthService {
  private baseUrl: string = 'auth';
  loggedIn$: Subject<boolean>

  constructor(
    private http: HttpClient,
  ) {
    this.loggedIn$ = new Subject<boolean>();
  }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>(this.baseUrl, loginUser);
  }

  logIn(token: string) {
    this.setToken(token);
    console.log(decode(token));
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    return this.http.post<Token>('/auth/', loginUser).pipe(
      tap(
        (data: Token) => this.logIn(data.token),
        () => this.logOut(),
      ),
    );
  }

  logIn(token: string) {
    this.setToken(token);
    this.loggedInSource.next(true);
  }

  logOut() {
    this.setToken(null);
    this.loggedInSource.next(false);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}

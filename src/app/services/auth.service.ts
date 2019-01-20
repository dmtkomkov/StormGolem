import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageService } from '@services/storage.service';

import { Observable, Subject } from 'rxjs';

import { LoginUser, Token } from '@interfaces';

@Injectable()
export class AuthService {
  loggedIn$: Subject<boolean>

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    this.loggedIn$ = new Subject<boolean>();
  }

  // Send authentication request
  auth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('auth', loginUser);
  }

  // Refresh token
  refresh() {
    const token: Token = this.storageService.getToken();
    this.http.post<Token>('refresh', token).subscribe((new_token: Token) => {
      this.storageService.setToken(new_token);
    });
  }

  logIn(token: Token) {
    this.storageService.setToken(token);
    this.loggedIn$.next(true);
  }

  logOut() {
    this.storageService.setToken(null);
    this.loggedIn$.next(false);
  }
}

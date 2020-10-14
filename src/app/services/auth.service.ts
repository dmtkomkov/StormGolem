import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ILoginUser, IToken } from '@interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  // Send authentication request
  auth(loginUser: ILoginUser): Observable<IToken> {
    return this.http.post<IToken>('auth', loginUser);
  }
}

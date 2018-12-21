import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '@interfaces';

@Injectable()
export class UserService {
  private baseUrl: string = 'user';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8000/api/v1/user/');
  }
}

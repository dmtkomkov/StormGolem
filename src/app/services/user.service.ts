import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from '@interfaces';

@Injectable({providedIn: 'root'})
export class UserService {
  private baseUrl: string = 'user';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl);
  }
}

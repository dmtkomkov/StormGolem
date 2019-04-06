import { Injectable } from '@angular/core';

import { Token } from '@interfaces';


@Injectable()
export class StorageService {
  private token: Token = null;

  constructor() { }

  getToken(): Token {
    return this.token;
  }

  setToken(token: Token) {
    this.token = token;
  }
}

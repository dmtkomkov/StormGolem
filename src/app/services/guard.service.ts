import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class GuardService  {
  canActivate() {
    return true;
  }
}

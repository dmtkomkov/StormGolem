import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {
  canActivate() {
    return true;
  }
}

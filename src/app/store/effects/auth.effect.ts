import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from "@services";
import {
  EAuthAction, AuthAction,
  LogIn, LogInError, LogInSuccess,
} from "@store/actions";
import { IToken } from "@interfaces";

import { of } from "rxjs";
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  @Effect() authUser$ = this.actions$.pipe(
    ofType<AuthAction>(EAuthAction.LogIn),
    concatMap((action: LogIn) => this.authService.auth(action.payload)
      .pipe(
        map((token: IToken) => {
          localStorage.setItem('token', token.token);
          return new LogInSuccess();
        }),
        catchError(() => {
          localStorage.setItem('token', null);
          return of(new LogInError());
        }),
      )
    ),
  );
}

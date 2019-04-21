import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthService } from "../../shared/services/auth.service";
import {
  EAuthAction, AuthAction,
  LogIn, LogInError, LogInSuccess,
  RefreshToken, RefreshTokenError, RefreshTokenSuccess,
} from "../actions/auth.actions";
import { IToken } from "@interfaces";
import { of } from "rxjs";

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

  @Effect() refreshUser$ = this.actions$.pipe(
    ofType<AuthAction>(EAuthAction.RefreshToken),
    concatMap((action: RefreshToken) => this.authService.refresh(action.payload)
      .pipe(
        map((new_token: IToken) => {
          localStorage.setItem('token', new_token.token);
          return new RefreshTokenSuccess();
        }),
        catchError(() => {
          localStorage.setItem('token', null);
          return of(new RefreshTokenError());
        }),
      )
    ),
  );
}
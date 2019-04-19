import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UserService } from "@services/user.service";
import { AuthService } from "@services/auth.service";
import {
  EAccessAction,
  LoadUserError,
  LoadUserSuccess,
  LogIn,
  LogInError,
  LogInSuccess, RefreshToken, RefreshTokenError, RefreshTokenSuccess,
  AccessAction
} from "../actions/access.actions";
import { IToken, IUser } from "@interfaces";
import { of } from "rxjs";

@Injectable()
export class AccessEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Effect() loadUser$ = this.actions$.pipe(
    ofType<AccessAction>(EAccessAction.LoadUser),
    concatMap(() => this.userService.getUser()
      .pipe(
        tap(ret => console.log(ret)),
        map((user: IUser) => new LoadUserSuccess(user)),
        catchError(() => of(new LoadUserError())),
      )
    ),
  );

  @Effect() authUser$ = this.actions$.pipe(
    ofType<AccessAction>(EAccessAction.LogIn),
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
    ofType<AccessAction>(EAccessAction.RefreshToken),
    concatMap((action: RefreshToken) => this.authService.refresh(action.payload)
      .pipe(
        tap((new_token: IToken) => localStorage.setItem('token', new_token.token)),
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
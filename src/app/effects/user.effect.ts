import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UserService } from "@services/user.service";
import { AuthService } from "@services/auth.service";
import {
  EUserAction,
  LoadUserError,
  LoadUserSuccess,
  LogIn,
  LogInError,
  LogInSuccess, RefreshTokenError, RefreshTokenSuccess,
  UserAction
} from "../actions/user.actions";
import { IToken, IUser } from "@interfaces";
import { of } from "rxjs";

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Effect() loadUser$ = this.actions$.pipe(
    ofType<UserAction>(EUserAction.LoadUser),
    concatMap(() => this.userService.getUser()
      .pipe(
        map((user: IUser) => new LoadUserSuccess(user)),
        catchError(() => of(new LoadUserError())),
      )
    ),
  );

  @Effect() authUser$ = this.actions$.pipe(
    ofType<UserAction>(EUserAction.LogIn),
    concatMap((action: LogIn) => this.authService.auth(action.payload)
      .pipe(
        map(() => new LogInSuccess()),
        catchError(() => of(new LogInError())),
      )
    ),
  );

  @Effect() refreshUser$ = this.actions$.pipe(
    ofType<UserAction>(EUserAction.RefreshToken),
    concatMap(() => this.authService.refresh()
      .pipe(
        tap((new_token: IToken) => localStorage.setItem('token', new_token.token)),
        map(() => new RefreshTokenSuccess()),
        catchError(() => of(new RefreshTokenError())),
      )
    ),
  );
}
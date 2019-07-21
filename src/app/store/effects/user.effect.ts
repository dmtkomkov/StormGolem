import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from "@services";
import {
  UserAction, EUserAction,
  LoadUserSuccess, LoadUserError,
} from "@store/actions";
import { IUser } from "@interfaces";

import { of } from "rxjs";
import { catchError, concatMap, map} from 'rxjs/operators';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
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
}

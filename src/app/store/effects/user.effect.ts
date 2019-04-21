import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map} from 'rxjs/operators';
import { UserService } from "../../shared/services/user.service";
import {
  UserAction, EUserAction,
  LoadUserSuccess, LoadUserError,
} from "../actions/user.actions";
import {IUser} from "@interfaces";
import { of } from "rxjs";

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
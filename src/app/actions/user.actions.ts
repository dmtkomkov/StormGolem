import { Action } from "@ngrx/store/src/models";
import { IUser } from "@interfaces";

export enum EUserAction {
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserError = '[User] Load User Error',
  ResetUser = '[User] Reset User',
}

export class LoadUser implements Action {
  public readonly type = EUserAction.LoadUser;
}

export class LoadUserSuccess implements Action {
  public readonly type = EUserAction.LoadUserSuccess;
  constructor(public payload: IUser) { }
}

export class LoadUserError implements Action {
  public readonly type = EUserAction.LoadUserError;
}

export class ResetUser implements Action {
  public readonly type = EUserAction.ResetUser;
}

export type UserAction = LoadUser | LoadUserSuccess | LoadUserError | ResetUser
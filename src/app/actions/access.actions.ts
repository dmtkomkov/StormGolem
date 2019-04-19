import { Action } from "@ngrx/store/src/models";
import {ILoginUser, IToken, IUser} from "@interfaces";

export enum EAccessAction {
  LogIn = '[Auth] Log In',
  LogInSuccess = '[Auth] Log In Success',
  LogInError = '[Auth] Log In Error',

  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserError = '[User] Load User Error',

  RefreshToken = '[Auth] Refresh Token',
  RefreshTokenSuccess = '[Auth] Refresh Token Success',
  RefreshTokenError = '[Auth] Refresh Token Error',

  LogOut = '[Auth] Log Out',
}

export class LogIn implements Action {
  public readonly type = EAccessAction.LogIn;
  constructor(public payload: ILoginUser) { }
}

export class LogInSuccess implements Action {
  public readonly type = EAccessAction.LogInSuccess;
}

export class LogInError implements Action {
  public readonly type = EAccessAction.LogInError;
}

export class LoadUser implements Action {
  public readonly type = EAccessAction.LoadUser;
}

export class LoadUserSuccess implements Action {
  public readonly type = EAccessAction.LoadUserSuccess;
  constructor(public payload: IUser) { }
}

export class LoadUserError implements Action {
  public readonly type = EAccessAction.LoadUserError;
}

export class RefreshToken implements Action {
  public readonly type = EAccessAction.RefreshToken;
  constructor(public token: IToken) { }
}

export class RefreshTokenSuccess implements Action {
  public readonly type = EAccessAction.RefreshTokenSuccess;
}

export class RefreshTokenError implements Action {
  public readonly type = EAccessAction.RefreshTokenError;
}

export class LogOut implements Action {
  public readonly type = EAccessAction.LogOut;
}

export type UserAction = LogIn | LogInSuccess | LogInError |
  LoadUser | LoadUserSuccess | LoadUserError |
  RefreshToken | RefreshTokenSuccess | RefreshTokenError |
  LogOut
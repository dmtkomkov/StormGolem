import { Action } from "@ngrx/store/src/models";
import {ILoginUser, IToken, IUser} from "@interfaces";

export enum EUserAction {
  LogIn = '[User] Log In',
  LogInSuccess = '[User] Log In Success',
  LogInError = '[User] Log In Error',

  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserError = '[User] Load User Error',

  RefreshToken = '[User] Refresh Token',
  RefreshTokenSuccess = '[User] Refresh Token Success',
  RefreshTokenError = '[User] Refresh Token Error',

  LogOut = '[User] Log Out',
}

export class LogIn implements Action {
  public readonly type = EUserAction.LogIn;
  constructor(public loginUser: ILoginUser) { }
}

export class LogInSuccess implements Action {
  public readonly type = EUserAction.LogInSuccess;
}

export class LogInError implements Action {
  public readonly type = EUserAction.LogInError;
}

export class LoadUser implements Action {
  public readonly type = EUserAction.LoadUser;
}

export class LoadUserSuccess implements Action {
  public readonly type = EUserAction.LoadUserSuccess;
  constructor(public user: IUser) { }
}

export class LoadUserError implements Action {
  public readonly type = EUserAction.LoadUserError;
}

export class RefreshToken implements Action {
  public readonly type = EUserAction.RefreshToken;
  constructor(public token: IToken) { }
}

export class RefreshTokenSuccess implements Action {
  public readonly type = EUserAction.RefreshTokenSuccess;
}

export class RefreshTokenError implements Action {
  public readonly type = EUserAction.RefreshTokenError;
}

export class LogOut implements Action {
  public readonly type = EUserAction.LogOut;
}
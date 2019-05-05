import { Action } from "@ngrx/store";
import { ILoginUser, IToken } from "@interfaces";

export enum EAuthAction {
  LogIn = '[Auth] Log In',
  LogInSuccess = '[Auth] Log In Success',
  LogInError = '[Auth] Log In Error',
  LogOut = '[Auth] Log Out',

  RefreshToken = '[Auth] Refresh Token',
  RefreshTokenSuccess = '[Auth] Refresh Token Success',
  RefreshTokenError = '[Auth] Refresh Token Error',
}

export class LogIn implements Action {
  public readonly type = EAuthAction.LogIn;
  constructor(public payload: ILoginUser) { }
}

export class LogInSuccess implements Action {
  public readonly type = EAuthAction.LogInSuccess;
}

export class LogInError implements Action {
  public readonly type = EAuthAction.LogInError;
}

export class RefreshToken implements Action {
  public readonly type = EAuthAction.RefreshToken;
  constructor(public payload: IToken) { }
}

export class RefreshTokenSuccess implements Action {
  public readonly type = EAuthAction.RefreshTokenSuccess;
}

export class RefreshTokenError implements Action {
  public readonly type = EAuthAction.RefreshTokenError;
}

export class LogOut implements Action {
  public readonly type = EAuthAction.LogOut;
}


export type AuthAction = LogIn | LogInSuccess | LogInError | LogOut |
  RefreshToken | RefreshTokenSuccess | RefreshTokenError
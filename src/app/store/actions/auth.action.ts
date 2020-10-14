import { Action } from "@ngrx/store";
import { ILoginUser } from "@interfaces";

export enum EAuthAction {
  LogIn = '[Auth] Log In',
  LogInSuccess = '[Auth] Log In Success',
  LogInError = '[Auth] Log In Error',
  LogOut = '[Auth] Log Out',
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

export class LogOut implements Action {
  public readonly type = EAuthAction.LogOut;
}


export type AuthAction = LogIn | LogInSuccess | LogInError | LogOut

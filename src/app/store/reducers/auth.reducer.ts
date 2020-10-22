import { AuthAction, EAuthAction } from "@store/actions";
import { EAuthStatus, IAuthState, initialAuthState } from "@store/states";

export function authReducer(state: IAuthState = initialAuthState, action: AuthAction): IAuthState {
  switch (action.type) {

    case EAuthAction.LogIn: return {authStatus: EAuthStatus.Authorization};
    case EAuthAction.LogInSuccess: return {authStatus: EAuthStatus.LoggedIn};
    case EAuthAction.LogOut: return state.authStatus === EAuthStatus.LoggedOut ? state : {authStatus: EAuthStatus.LoggedOut};
    case EAuthAction.LogInError: return {authStatus: EAuthStatus.LoggedInError};
    default: return state;
  }
}

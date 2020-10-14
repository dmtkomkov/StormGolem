import { EAuthAction, AuthAction } from "@store/actions";
import { EAuthStatus, IAuthState } from "@store/states";

export function authReducer(state: IAuthState = null, action: AuthAction): IAuthState {
  switch (action.type) {

    case EAuthAction.LogIn: return {authStatus: EAuthStatus.Authorization};
    case EAuthAction.LogInSuccess: return {authStatus: EAuthStatus.LoggedIn};

    case EAuthAction.LogOut:
    case EAuthAction.LogInError: {
      return {authStatus: EAuthStatus.LoggedOut};
    }

    default: {
      return state;
    }
  }
}

import { EAuthAction, AuthAction } from "@store/actions";
import { EAuthStatus, initialAuthState, IAuthState } from "@store/states";

export function authReducer(state: IAuthState = initialAuthState, action: AuthAction): IAuthState {
  switch (action.type) {

    case EAuthAction.LogIn: return {authStatus: EAuthStatus.Authorization};
    case EAuthAction.LogInSuccess: return {authStatus: EAuthStatus.LoggedIn};

    case EAuthAction.LogOut:
    case EAuthAction.LogInError:
    case EAuthAction.RefreshTokenError: {
      return {authStatus: EAuthStatus.LoggedOut};
    }

    case EAuthAction.RefreshToken:
    case EAuthAction.RefreshTokenSuccess:
    default: {
      return state;
    }
  }
};

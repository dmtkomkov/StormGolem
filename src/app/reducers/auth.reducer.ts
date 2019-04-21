import {EAuthAction, AuthAction} from "../actions/auth.actions";
import {EAuthStatus, initialAuthState, IAuthState} from "../states/auth.state";

export const authReducer = (state: IAuthState = initialAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {

    case EAuthAction.LogIn: return {authStatus: EAuthStatus.Authorization};
    case EAuthAction.LogInSuccess: return {authStatus: EAuthStatus.LoggedIn};
    case EAuthAction.LogInError: return {authStatus: EAuthStatus.LoggedOut};

    case EAuthAction.RefreshToken: return {authStatus: EAuthStatus.Refresh};
    case EAuthAction.RefreshTokenSuccess: return {authStatus: EAuthStatus.LoggedIn};
    case EAuthAction.RefreshTokenError: return {authStatus: EAuthStatus.LoggedOut};

    case EAuthAction.LogOut: return {authStatus: EAuthStatus.LoggedOut};

    default: return state;
  }
};

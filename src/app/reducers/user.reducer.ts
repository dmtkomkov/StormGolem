import {EUserAction, UserAction} from "../actions/user.actions";
import {EUserStatus, initialUserState, IUserState} from "../states/user.state";

export const userReducer = (state: IUserState = initialUserState, action: UserAction): IUserState => {
  switch (action.type) {

    case EUserAction.LogIn: return {user: null, status: EUserStatus.Authorization};
    case EUserAction.LogInSuccess: return {...state, status: EUserStatus.LoggedIn};
    case EUserAction.LogInError: return initialUserState;

    case EUserAction.LoadUser: return {...state, status: EUserStatus.Loading};
    case EUserAction.LoadUserSuccess: return {user: action.payload, status: EUserStatus.LoggedIn};
    case EUserAction.LoadUserError: return initialUserState;

    case EUserAction.RefreshToken: return {...state, status: EUserStatus.Refresh};
    case EUserAction.RefreshTokenSuccess: return {...state, status: EUserStatus.LoggedIn};
    case EUserAction.RefreshTokenError: return initialUserState;

    case EUserAction.LogOut: return initialUserState;

    default: return state;
  }
};

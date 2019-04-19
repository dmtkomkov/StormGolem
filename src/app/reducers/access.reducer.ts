import {EAccessAction, AccessAction} from "../actions/access.actions";
import {EAccessStatus, initialUserState, IAccessState} from "../states/access.state";

export const accessReducer = (state: IAccessState = initialUserState, action: AccessAction): IAccessState => {
  switch (action.type) {

    case EAccessAction.LogIn: return {user: null, status: EAccessStatus.Authorization};
    case EAccessAction.LogInSuccess: return {...state, status: EAccessStatus.LoggedIn};
    case EAccessAction.LogInError: return initialUserState;

    case EAccessAction.LoadUser: return {...state, status: EAccessStatus.Identification};
    case EAccessAction.LoadUserSuccess: return {user: action.payload, status: EAccessStatus.LoggedIn};
    case EAccessAction.LoadUserError: return initialUserState;

    case EAccessAction.RefreshToken: return {...state, status: EAccessStatus.Refresh};
    case EAccessAction.RefreshTokenSuccess: return {...state, status: EAccessStatus.LoggedIn};
    case EAccessAction.RefreshTokenError: return initialUserState;

    case EAccessAction.LogOut: return initialUserState;

    default: return state;
  }
};

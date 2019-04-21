import {EUserAction, UserAction} from "../actions/user.actions";
import {initialUserState, IUserState} from "../states/user.state";

export const userReducer = (state: IUserState = initialUserState, action: UserAction): IUserState => {
  switch (action.type) {

    case EUserAction.LoadUser: return {...state, loading: true};
    case EUserAction.LoadUserSuccess: return {user: action.payload, loading: false};
    case EUserAction.LoadUserError: return {...state, loading: false};
    case EUserAction.ResetUser: return initialUserState;

    default: return state;
  }
};
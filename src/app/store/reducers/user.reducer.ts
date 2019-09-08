import { EUserAction, UserAction } from "@store/actions";
import { initialUserState, IUserState } from "@store/states";

export function userReducer(state: IUserState = initialUserState, action: UserAction): IUserState {
  switch (action.type) {

    case EUserAction.LoadUser: return {...state, loading: true};
    case EUserAction.LoadUserSuccess: return {user: action.payload, loading: false};
    case EUserAction.LoadUserError: return {...state, loading: false};
    case EUserAction.ResetUser: return initialUserState;

    default: return state;
  }
};

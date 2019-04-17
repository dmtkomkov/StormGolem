import {EUserAction, UserAction} from "../actions/user.actions";
import {initialUserState, IUserState} from "../states/user.state";

export const userReducer = (state: IUserState = initialUserState, action: UserAction): IUserState => {

  switch (action.type) {

    case EUserAction.LogOut: return initialUserState;

    default: return state;
  }
};

import { pipe } from "rxjs";
import { map, tap } from "rxjs/operators";
import { EAuthStatus, IAuthState } from "@store/states";

export const getAuthStatus = () => pipe(
  map((authState: IAuthState) => authState.authStatus),
);

export const handleAuthStatus = (onLogIn, onLogOut, onLogInError = () => {}) => pipe(
  tap((status: EAuthStatus) => {
    switch (status) {
      case EAuthStatus.LoggedIn: { onLogIn(); break; }
      case EAuthStatus.LoggedOut: { onLogOut(); break; }
      case EAuthStatus.LoggedInError: { onLogInError(); break; }
    }
  })
);

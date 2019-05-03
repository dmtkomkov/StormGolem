import { pipe } from "rxjs";
import { map, skip, tap } from "rxjs/operators";
import { EAuthStatus, IAuthState } from "@store/states";

export const waitNewAuthStatus = () => pipe(
  skip(1),
  map((authState: IAuthState) => authState.authStatus),
);

export const handleAuthStatus = (onLogIn, onLogOut) => pipe(
  tap((status: EAuthStatus) => {
    switch (status) {
      case EAuthStatus.LoggedIn: { onLogIn(); break; }
      case EAuthStatus.LoggedOut: { onLogOut(); break; }
    }
  })
);
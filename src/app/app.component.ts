import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';

import {IUser} from '@interfaces';
import {Store} from "@ngrx/store";
import {IAppState} from "./states/app.state";
import {Observable, Subscription} from "rxjs";
import {authSlice, EAuthStatus, IAuthState} from "./states/auth.state";
import {IUserState, userSlice} from "./states/user.state";
import {map, skip} from "rxjs/operators";
import {LoadUser, ResetUser} from "./actions/user.actions";
import {LogOut} from "./actions/auth.actions";

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
  public user$: Observable<IUser>;
  public title: string;
  private statusSubscription: Subscription;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private store: Store<IAppState>,
  ) {
    this.title = 'Storm Golem';
  }

  ngOnInit() {
    for (let icon of ['lightning', 'user']) {
      const safeResourceUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`);
      this.iconRegistry.addSvgIcon(icon, safeResourceUrl);
    }

    this.user$ = this.store.select(userSlice).pipe(
      map((userState: IUserState) => userState.user),
    );

    this.statusSubscription = this.store.select(authSlice).pipe(
      skip(1),
      map((authState: IAuthState) => authState.authStatus),
    ).subscribe((status: EAuthStatus) => {
      switch (status) {
        case EAuthStatus.LoggedIn: { this.store.dispatch(new LoadUser()); break; }
        case EAuthStatus.LoggedOut: { this.store.dispatch(new ResetUser()); break; }
      }
    });
    this.store.dispatch(new LoadUser());
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    localStorage.setItem('token', null);
    this.store.dispatch(new LogOut());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginDialogComponent } from '@shared/dialogs/login-dialog/login-dialog.component';

import { IUser } from '@interfaces';

import { Store } from "@ngrx/store";
import { IAppState, authSlice, IUserState, userSlice } from "@store/states";
import { LoadUser, ResetUser } from "@store/actions";
import { LogOut } from "@store/actions";

import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { handleAuthStatus, waitNewAuthStatus } from "@shared/helpers/auth.helpers";
import { ModalService } from "@modal/modal.service";

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
    private dialog: ModalService,
    private store: Store<IAppState>,
  ) {
    this.title = 'Storm Golem';
  }

  ngOnInit() {
    this.user$ = this.store.select(userSlice).pipe(
      map((userState: IUserState) => userState.user),
    );

    this.statusSubscription = this.store.select(authSlice).pipe(
      waitNewAuthStatus(),
      handleAuthStatus(
        () => this.store.dispatch(new LoadUser()),
        () => this.store.dispatch(new ResetUser()),
      )
    ).subscribe();
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

  showMenu() { }
}

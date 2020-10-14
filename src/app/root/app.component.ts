import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginDialogComponent } from '@shared/dialogs/login-dialog/login-dialog.component';

import { EAnimation, EModalType, IUser } from '@interfaces';

import { Store } from "@ngrx/store";
import { authSlice, IAppState, IUserState, userSlice } from "@store/states";
import { LoadUser, LogOut, ResetUser } from "@store/actions";

import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { handleAuthStatus, getAuthStatus } from "@shared/helpers/auth.helpers";
import { ModalService } from "@modal/modal.service";
import { MainMenuComponent } from "@shared/dialogs/main-menu/main-menu.component";

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
      getAuthStatus(),
      handleAuthStatus(
        () => this.store.dispatch(new LoadUser()),
        () => {
          this.store.dispatch(new ResetUser());
          this.openLoginDialog();
        },
      )
    ).subscribe();
    this.store.dispatch(new LoadUser());
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, { animation: EAnimation.FOCUS, type: EModalType.DIALOG });
  }

  logout() {
    localStorage.setItem('token', null);
    this.store.dispatch(new LogOut());
  }

  showMenu() {
    this.dialog.open(MainMenuComponent, { animation: EAnimation.FLY, type: EModalType.LEFT_MENU });
  }
}

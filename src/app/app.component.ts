import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';

import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

import {IUser} from '@interfaces';
import {select, Store} from "@ngrx/store";
import {IAppState} from "./states/app.state";
import {LoadUser} from "./actions/access.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
  public user$: Observable<IUser>;
  public title: string;
  user: IUser;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,
    private store: Store<IAppState>,
  ) {
    this.title = 'Storm Golem';
    this.user = null;
  }

  ngOnInit() {
    for (let icon of ['lightning', 'user']) {
      const safeResourceUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`);
      this.iconRegistry.addSvgIcon(icon, safeResourceUrl);
    }

    this.user$ = this.store.pipe(select((state: IAppState) => state.access.user));
    this.store.dispatch(new LoadUser());

    this.readUser(); // Read access first time on Init

    // Subscribe on access change
    this.authService.loggedIn$.subscribe(() => this.readUser());
  }

  readUser() {
    this.userService.getUser().subscribe(
      (user: IUser) => {
        this.user = user;
      },
      () => {
        this.user = null;
      }
    );
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.user = null;
    this.authService.logOut();
  }
}

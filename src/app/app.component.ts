import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';

import {IUser} from '@interfaces';
import {select, Store} from "@ngrx/store";
import {IAppState} from "./states/app.state";
import {LoadUser, LogOut} from "./actions/access.actions";
import {Observable} from "rxjs";
import {ResetBlog} from "./actions/blog.actions";

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
  public user$: Observable<IUser>;
  public title: string;

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

    this.user$ = this.store.pipe(select((state: IAppState) => state.access.user));
    this.store.dispatch(new LoadUser());
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    localStorage.setItem('token', null);
    this.store.dispatch(new LogOut());
    this.store.dispatch(new ResetBlog());
  }
}

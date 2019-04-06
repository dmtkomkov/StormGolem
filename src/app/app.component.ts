import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';

import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

import { IUser } from '@interfaces';

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
  title: string;
  user: IUser;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.title = 'Storm Golem';
    this.user = null;
  }

  ngOnInit() {
    for (let icon of ['lightning', 'user']) {
      const safeResourceUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`);
      this.iconRegistry.addSvgIcon(icon, safeResourceUrl);
    }

    this.readUser(); // Read user first time on Init

    // Subscribe on user change
    this.authService.loggedIn$.subscribe((loggedIn: boolean) => {
      loggedIn? this.readUser(): this.user = null;
    });
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

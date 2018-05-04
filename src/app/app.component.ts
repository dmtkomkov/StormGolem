import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { User } from './interfaces';

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
  title: string;
  user: User;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,
  ) {
    iconRegistry.addSvgIcon(
      'lightning',
      sanitizer.bypassSecurityTrustResourceUrl('assets/lightning.svg'),
    ),
    this.title = 'Storm Golem';
    this.user = null;
  }

  ngOnInit() {
    this.readUser(); // Read user first time on Init

    // Subscribe on user change
    this.authService.loggedIn$.subscribe(res => {
      this.readUser();
    });
  }

  readUser() {
    this.userService.getUser().subscribe(
      data => {
        console.log('New User: ', data),
        this.user = data;
      },
      error => {
        console.log('Failing at getting User: ', error),
        this.user = null;
      }
    );
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}

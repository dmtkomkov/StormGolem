import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router,
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
    this.authService.loggedIn$.subscribe((loggedIn: boolean) => {
      loggedIn? this.readUser(): this.user = null;
    });
  }

  readUser() {
    this.userService.getUser().subscribe(
      (user: User) => {
        console.log('New User: ', user),
        this.user = user;
      },
      (error: HttpErrorResponse) => {
        console.log('Error User: ', error.message),
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
    this.router.navigate(['/']);
  }
}

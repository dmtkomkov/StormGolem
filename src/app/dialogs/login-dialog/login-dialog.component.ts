import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';

import { ILoginUser } from '@interfaces';
import {LogIn} from "../../actions/access.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../states/app.state";

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ]
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  loginUser: ILoginUser;
  loginErrMsg: string;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<IAppState>,
  ) {
    this.loginErrMsg = null;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.loginUser = <ILoginUser>this.loginForm.value;
    this.store.dispatch(new LogIn(this.loginUser));
    // this.authService.auth(this.loginUser).subscribe(
    //   (token: IToken) => {
    //     this.authService.logIn(token);
    //     this.loginErrMsg = null;
    //     this.dialogRef.close();
    //   },
    //   error => {
    //     this.authService.logOut();
    //     this.loginErrMsg = `Login failed (${error.status})`;
    //     setTimeout(() => this.loginErrMsg = null, 2000);
    //   }
    // );
  }
}

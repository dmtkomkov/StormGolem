import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { LoginUser } from '../../interfaces';

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ]
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  loginUser: LoginUser;
  loginErrMsg: string;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
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

  login() {
    this.loginUser = <LoginUser>this.loginForm.value;
    this.authService.auth(this.loginUser).subscribe(
      data => {
        this.loginErrMsg = null;
        this.dialogRef.close();
      },
      error => {
        this.loginErrMsg = `Login failed (${error.status})`;
        setTimeout(() => this.loginErrMsg = null, 2000);
      }
    );
  }
}

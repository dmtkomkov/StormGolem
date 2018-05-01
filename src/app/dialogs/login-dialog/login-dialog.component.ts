import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ]
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
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
    this.authService.auth(this.loginForm.value).subscribe(
      data => {
        this.loginErrMsg = null;
        this.authService.login(data.token);
        this.dialogRef.close();
      },
      error => {
        this.loginErrMsg = `Login failed (${error.status})`;
        setTimeout(() => this.loginErrMsg = null, 2000);
      }
    );
  }
}

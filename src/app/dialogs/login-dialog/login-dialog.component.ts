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

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

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
      data => this.authService.storeToken(data.token),
      error => console.log(error.error.non_field_errors[0]),
    );
  }
}

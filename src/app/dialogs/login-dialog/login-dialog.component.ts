import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

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
    private userService: UserService,
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
    this.userService.getUser(this.loginForm.value).subscribe(
      data => console.log(data.token),
      error => console.log(error.error.non_field_errors[0]),
    );
  }
}

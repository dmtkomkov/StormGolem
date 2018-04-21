import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.loginForm);
    console.log(this.loginForm.value);
  }
}

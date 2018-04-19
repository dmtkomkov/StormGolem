import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ]
})
export class LoginDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
  ) { }
}

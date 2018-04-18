import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sg-login-dialog',
  template: `
    <p>
      login-dialog works!
    </p>
  `,
  styles: []
})
export class LoginDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
  ) { }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LogIn} from "../../../store/actions/auth.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../../store/states/app.state";
import {Subscription} from "rxjs";
import {map, skip} from "rxjs/operators";
import {authSlice, EAuthStatus, IAuthState} from "../../../store/states/auth.state";

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loginErrMsg: string;
  private statusSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.loginErrMsg = null;
  }

  ngOnInit() {
    this.statusSubscription = this.store.select(authSlice).pipe(
      skip(1),
      map((authState: IAuthState) => authState.authStatus),
    ).subscribe((status: EAuthStatus) => {
      switch (status) {
        case EAuthStatus.LoggedIn: {
          this.loginErrMsg = null;
          this.dialogRef.close();
          break;
        }
        case EAuthStatus.LoggedOut: {
          this.loginErrMsg = `Login failed`;
          setTimeout(() => this.loginErrMsg = null, 2000);
          break;
        }
      }
    });

    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.store.dispatch(new LogIn(this.loginForm.value));
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}

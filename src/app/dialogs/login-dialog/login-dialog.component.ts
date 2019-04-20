import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LogIn} from "../../actions/access.actions";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../../states/app.state";
import {Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {EAccessStatus} from "../../states/access.state";

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loginErrMsg: string;
  private unsubsriber: Subject<void> = new Subject();
  private currentStatus: EAccessStatus;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.currentStatus = null;
    this.loginErrMsg = null;
  }

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.unsubsriber),
      select((state: IAppState) => state.access.status),
      tap((newStatus: EAccessStatus) => {
        if (this.currentStatus === EAccessStatus.Authorization && newStatus === EAccessStatus.LoggedIn) {
          this.loginErrMsg = null;
          this.dialogRef.close();
        } else if (this.currentStatus === EAccessStatus.Authorization && newStatus === EAccessStatus.LoggedOut) {
          this.loginErrMsg = `Login failed`;
          setTimeout(() => this.loginErrMsg = null, 2000);
        }
        this.currentStatus = newStatus;
      }),
    ).subscribe();

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
    this.unsubsriber.next();
    this.unsubsriber.complete();
  }
}

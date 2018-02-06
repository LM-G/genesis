import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AppStore } from 'app/$core/store/app-store';

@Component({
  templateUrl: './sign-out-dialog.component.html',
  styleUrls: [ './sign-out-dialog.component.scss' ]
})
export class SignOutDialogComponent {

  constructor(private _dialogRef: MatDialogRef<SignOutDialogComponent>,
              private _router: Router,
              private _appStore: AppStore) { }

  onConfirm(): void {
    this._appStore.reset();
    this._dialogRef.close();
    this._router.navigate([ '/sign-in' ]);
  }
}

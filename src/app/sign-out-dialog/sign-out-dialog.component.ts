import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AppState } from 'app/$core/store/app.state';

@Component({
  templateUrl: './sign-out-dialog.component.html',
  styleUrls: [ './sign-out-dialog.component.scss' ]
})
export class SignOutDialogComponent {

  constructor(private _dialogRef: MatDialogRef<SignOutDialogComponent>,
              private _router: Router,
              private _appState: AppState) { }

  onConfirm(): void {
    this._appState.reset();
    this._dialogRef.close();
    this._router.navigate([ '/sign-in' ]);
  }
}

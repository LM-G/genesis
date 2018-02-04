import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignOutDialogComponent } from '@genesis/private/sign-out-dialog/sign-out-dialog.component';

/**
 * Side navigation component
 */
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: [ 'side-nav.component.scss' ]
})
export class SideNavComponent implements OnInit {
  /**
   * Side nav component's constructor
   */
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('# SideNavComponent started');
  }

  disconnect() {
    this._dialog.open(SignOutDialogComponent);
  }
}

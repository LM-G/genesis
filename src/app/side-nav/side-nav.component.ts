import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Unsubscriber } from '@genesis/$shared/util/unsubscriber';
import { SideNavState } from '@genesis/side-nav/side-nav.state';
import { SignOutDialogComponent } from 'app/sign-out-dialog/sign-out-dialog.component';
import { takeUntil } from 'rxjs/operators';


/**
 * Side navigation component
 */
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: [ 'side-nav.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, OnDestroy {
  minimized: boolean;
  collapsed: boolean;

  private _unsubcriber: Unsubscriber;

  constructor(private _dialog: MatDialog,
              private _sideNavState: SideNavState,
              private _cdr: ChangeDetectorRef) {
    this._unsubcriber = new Unsubscriber();
  }

  ngOnInit() {
    this._sideNavState.minimized$.pipe(
      takeUntil(this._unsubcriber)
    ).subscribe(minimized => {
      this.minimized = minimized;
      this._cdr.markForCheck();
      console.log('minimized$ : ', minimized);
    });

    this._sideNavState.collapsed$.pipe(
      takeUntil(this._unsubcriber)
    ).subscribe(collapsed => {
      this.collapsed = collapsed;
      this._cdr.markForCheck();
      console.log('collapsed$ : ', collapsed);
    });
  }

  close() {
    this._sideNavState.collapsed$.next(true);
  }

  ngOnDestroy() {
    this._unsubcriber.close();
  }

  disconnect() {
    this._dialog.open(SignOutDialogComponent);
  }
}

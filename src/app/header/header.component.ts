import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '@genesis/$core/store/app.state';
import { User } from '@genesis/$shared/model/user';
import { SideNavState } from '@genesis/side-nav/side-nav.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private _appState: AppState,
              private _sideNavState: SideNavState) {}

  ngOnInit() {
    this.user = this._appState.user;
  }

  toggleSideNav() {
    this._sideNavState.toggle();
  }
}

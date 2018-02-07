import { Component } from '@angular/core';
import { AppStore } from '@genesis/$core/store/app-store';
import { User } from '@genesis/$shared/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent {
  user: User;

  constructor(private _appStore: AppStore) {
    this.user = _appStore.user;
  }
}

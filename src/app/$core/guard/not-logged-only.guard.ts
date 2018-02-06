import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppStore } from 'app/$core/store/app-store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotLoggedOnlyGuard implements CanActivate {
  constructor(private _router: Router,
              private _appStore: AppStore) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const canGo = this._appStore.tokens.accessToken === undefined;

    console.log('# NotLoggedOnlyGuard :: can activate ', state.url, ' ? : ', canGo, state);

    if (!canGo) {
      this._router.navigate([ '/home' ]);
    }

    return canGo;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppState } from '@genesis/$core/store/app.state';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected _router: Router,
              private _appStore: AppState) {}

  /**
   * Checks that the user is connected and if so, permits the activation of the wanted state. If the user is not
   * authenticated, he is redirected toward home page with login inputs presented.
   *
   * @param route current route
   * @param state wanted state
   * @returns {boolean} true if the user is authenticated
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canGo = this._appStore.tokens.accessToken !== undefined;

    console.log('# AuthGuard :: can activate ', state.url, ' ? : ', canGo, state);

    if (!canGo) {
      this._router.navigate([ '/sign-in' ]);
    }

    return canGo;
  }
}

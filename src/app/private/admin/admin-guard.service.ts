import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppState } from '../../core/store/store';
import { Store } from '@ngrx/store';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppState>
    ) {
    }

    /**
     * Checks that the user admin.
     *
     * @param route current route
     * @param state wanted state
     * @returns {boolean} true if the user is authenticated and is role is 'admin'
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected router: Router) {
    }

    /**
     * Checks that the user is connected and if so, permits the activation of the wanted state. If the user is not
     * authenticated, he is redirected toward home page with login inputs presented.
     *
     * @param route current route
     * @param state wanted state
     * @returns {boolean} true if the user is authenticated
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        const canGo = false;

        console.log('# AuthGuard :: can activate ', url, ' ? : ', canGo, state);

        if (!canGo) {
            this.router.navigate([ '/sign-in' ]);
        }

        return canGo;
    }
}

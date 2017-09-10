import {AuthenticationService} from './authentication.service';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/**
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {
    }

    /**
     * Checks that the user is connected and if so, permits the activation of the wanted state. If the user is not
     * authenticated, he is redirected toward home page with login inputs presented.
     *
     * @param route current route
     * @param state wanted state
     * @returns {boolean} true if the user is authenticated
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let url: string = state.url;

        const canGo = this.authService.loggedIn();

        console.log('router :: can activate ', url, ' ? : ', canGo, state);

        if (!canGo) {
            this.authService.redirectUrl = url;

            let navigationExtras: NavigationExtras = {
                queryParams: { 'sl': 't' }
            };

            this.router.navigate(['/home'], navigationExtras);
        }

        return canGo;
    }
}

import {AuthenticationService} from './authentication.service';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {
    }

    /**
     * Vérifie que l'utilisateur est connecté
     * @param route route courante
     * @param state état cible
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let url: string = state.url;

        const canGo = this.authService.loggedIn();

        console.log('router :: can activate ', url, ' ? : ', canGo, state);

        if(!canGo){
            this.authService.redirectUrl = url;

            let navigationExtras: NavigationExtras = {
                queryParams: { 'sl': 't' }
            };

            this.router.navigate(['/home'], navigationExtras);
        }

        return canGo;
    }
}

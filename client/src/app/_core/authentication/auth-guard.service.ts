import {AuthenticationService} from './authentication.service';
import {CanLoad, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthenticationService, private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }


    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
        return null;
    }

    checkLogin(url: string): boolean {
        console.log('check login url : ', url);
        if (this.authService.loggedIn()) {
            return true;
        }

        // Navigate to the home page with extras
        this.router.navigate(['']);
        return false;
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoginService } from '../login/login.service';
import { SideNavService } from '../side-nav/side-nav.service';

/**
 * Main Navigation component
 */
@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent{
    /**
     * Nav component's constructor
     * @param authService for logout the user
     * @param router to redirect user when he logs out
     * @param loginService to hide or display login element
     * @param sideNavService to hide or display side nav bar
     */
    constructor(public authService: AuthenticationService,
                private router: Router,
                private loginService: LoginService,
                private  sideNavService: SideNavService) {}

    /**
     * Toggles login component display mode
     */
    toggleLogin(){
        this.loginService.toggle();
    }

    /**
     * Toggles the side nav component display mode
     */
    toggleSideNav(){
        this.sideNavService.toggle();
    }

    /**
     * Disconnect the current user
     */
    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}

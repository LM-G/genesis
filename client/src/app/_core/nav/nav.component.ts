import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SideNavService } from '../side-nav/side-nav.service';

@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent{

    constructor(private authService: AuthenticationService,
                private router: Router,
                private loginService: LoginService,
                private  sideNavService: SideNavService) {}

    toggleLogin(){
        this.loginService.toggle();
    }

    toggleSideNav(){
        this.sideNavService.toggle();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}

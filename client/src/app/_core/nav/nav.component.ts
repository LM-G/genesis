import {Component, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent{

    constructor(private authService: AuthenticationService,
                private router: Router,
                private loginService: LoginService) {}

    toggleLogin(){
        this.loginService.toggle();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}

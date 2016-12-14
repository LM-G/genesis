import {Component, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent{
    @Output() loginToggled = new EventEmitter();


    constructor(private authService: AuthenticationService, private router: Router) {}

    toggleLogin(): void {
        this.loginToggled.emit();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}

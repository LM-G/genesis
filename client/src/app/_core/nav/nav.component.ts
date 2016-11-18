import {Component, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {
    @Output() loginToggled = new EventEmitter();

    constructor(private authService: AuthenticationService) {}

    toggleLogin() {
        this.loginToggled.emit();
    }

    logout() {
        this.authService.logout();
    }
}

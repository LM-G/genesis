import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../../shared/models/user.model';
@Component({
    selector: 'genesis-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    username: string;
    password: string;
    loading: boolean = false;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        console.log('login component loaded');
    }

    login() {
        this.loading = true;
        this.authenticationService
            .login(this.username, this.password)
            .subscribe(
                (user: User) => console.log('connexion reussie : ', user),
                (err: any) => console.log('connexion échec : ', err),
                () => this.loading = false
            );
    }
}

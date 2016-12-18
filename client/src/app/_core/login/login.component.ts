import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../_shared/models/user.model';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { LoginService } from './login.service';
import { Genesis } from '../genesis.service';
@Component({
    selector: 'genesis-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    showLogin: boolean;

    /* credentials */
    username: string;
    password: string;

    /* utility */
    loading: boolean = false;

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                private router: Router,
                private loginService: LoginService,
                private genesis: Genesis) {
        // Listen to login state change to know if the form needs to be hidden or shown
        loginService.stateObservable.subscribe(
            isLoginShown => {
                this.showLogin = isLoginShown;
            }
        )
    }

    /**
     * logged in the user
     */
    login(): void {
        console.log('hey im login in !');
        // if login succeed
        const onNext = (user: User) => {
            console.log('User connected.');
            // set the user
            this.genesis.setUser(user);
            // hide the component
            this.loginService.hide();
            // if a redirect url is stored
            const redirectUrl = this.authService.redirectUrl;
            if(redirectUrl != null){
                // then redirects to it
                this.router.navigate([redirectUrl]);
            }
        };
        // if login failed
        const onError = (err: any) => console.log('Connexion échec : ', err);

        // credentials are reset
        const onComplete = () => this.username = this.password = null;

        this.loading = true;
        this.authService
            .login(this.username, this.password)
            .finally(() => this.loading = false)
            .subscribe(onNext, onError, onComplete);
    }
}

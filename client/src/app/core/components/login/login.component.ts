import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../../shared/model/user';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { CoreService } from '../../core.service';

/**
 * Login component
 */
@Component({
    selector: 'genesis-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit{
    // tells if the login form is shown or hidden
    showLogin: boolean;

    // credentials
    username: string;
    password: string;

    // utility
    loading: boolean = false;

    /**
     * Login component's constructor
     *
     * @param authService authentication service to call login endpoints
     * @param router for redirection after successful login
     * @param route for getting query params which will customize login component behavior
     * @param loginService get the shared state of component behavior
     * @param genesis application base service
     */
    constructor(private authService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private loginService: LoginService,
                private genesis: CoreService) {
        // Listens the login state change in login service to know if the form needs to be hidden or shown
        loginService.stateObservable.subscribe(
            isLoginShown => {
                this.showLogin = isLoginShown;
            }
        )
    }

    ngOnInit(): void {
        /* todo : quand la fonctionnalité sera disponible, passer par des variables non liées à l'url ... */
        this.route.queryParams.subscribe((params : Params) => {
            console.log ('app params : ' , params);
            // if user is not logged and path params tells us to show login form
            if(params['sl'] === 't' && this.authService.notLoggedIn()){
                // then login form is displayed to user
                this.loginService.show();
            }
        });
    }

    /**
     * log in the user
     */
    login(): void {
        // sucess callback
        const onNext = (user: User) => {
            console.log('User connected.');
            // set the user
            //this.genesis.setUser(user);
            // hide the component
            this.loginService.hide();
            // if a redirect url is stored
            const redirectUrl = this.authService.redirectUrl;
            if(redirectUrl != null){
                // then redirects to it
                this.router.navigate([redirectUrl]);
            }
        };
        // error callback
        const onError = (err: any) => console.log('User connection failed : ', err);

        // credentials are reset
        const onComplete = () => this.username = this.password = null;

        this.loading = true;
        this.authService
            .login(this.username, this.password)
            .finally(() => this.loading = false)
            .subscribe(onNext, onError, onComplete);
    }
}

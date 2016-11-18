import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../_shared/models/user.model';
import { UserService } from '../user.service';
@Component({
    selector: 'genesis-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    /* I/Os */
    @Input() showLogin: boolean;
    @Output() hide = new EventEmitter();

    /* credentials */
    public username: string;
    public password: string;

    /* utility */
    loading: boolean = false;

    constructor(private authService: AuthenticationService, private userService: UserService) {
    }

    /**
     * logged in the user
     */
    login(): void {
        console.log('hey im login in !');
        /* if login succeed */
        const onNext = (user: User) => {
            console.log('User connected.');
            /* user is set */
            this.userService.user = user;
            /* login form is hidden */
            this.hide.emit();
        };
        /* if login failed */
        const onError = (err: any) => console.log('connexion échec : ', err);

        // credentials are reset
        const onComplete = () => this.username = this.password = null;

        this.loading = true;
        this.authService
            .login(this.username, this.password)
            .finally(() => this.loading = false)
            .subscribe(onNext, onError, onComplete);
    }
}

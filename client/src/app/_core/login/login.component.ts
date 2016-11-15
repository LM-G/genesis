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
    username: string;
    password: string;

    /* utility */
    loading: boolean = false;

    constructor(private authService: AuthenticationService, private userService: UserService) {
    }

    /**
     * logged in the user
     */
    login(): void {
        const onNext = (user: User) => {
            console.log('User connected.');
            this.userService.user = user;
            this.hide.emit();
        };
        const onError = (err: any) => console.log('connexion échec : ', err);
        const onCompleted = () => {this.loading = false};

        this.loading = true;
        this.authService
            .login(this.username, this.password)
            .subscribe(onNext, onError, onCompleted);
    }
}

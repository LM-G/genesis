import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInForm } from '../../shared/form/sign-in';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/store';
import { AuthService } from '../../core/api/auth.service';
import { LocalStorage } from '../../core/store/local-storage';
import { FetchUserAction } from '../../core/store/action/user.actions';

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private store: Store<AppState>,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('# SignInComponent started');
        this.initSignInForm();
    }

    register(): void {
        this.router.navigate(['/sign-up']);
    }

    /**
     * Initializes login form
     */
    initSignInForm(): void {

        this.signInForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
            rememberme: true
        });
    }

    /**
     * SignIn
     * @param {SignInForm} value
     * @param {boolean} valid
     */
    signIn({ value, valid }: { value: SignInForm, valid: boolean }): void {
        if (!valid) {
            return;
        }

        this.authService.signIn(value)
            .subscribe(
                (token: string) => {
                    LocalStorage.token = token;
                    this.store.dispatch(new FetchUserAction());
                }
            );
    }
}

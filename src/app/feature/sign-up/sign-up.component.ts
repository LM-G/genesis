import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInForm } from '../../shared/form/sign-in';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/store';
import { AuthService } from '../../core/api/auth.service';
import { SignUpForm } from '../../shared/form/sign-up';
import { EMAIL_REGEXP } from '../../shared/constant/static';
import { CustomValidators } from '../../shared/validator/custom-validator';

interface ISignUpForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    isLoading = false;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private store: Store<AppState>,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('# SignUpComponent started');
        this.initSignUpForm();
    }

    /**
     * Initializes register form
     */
    initSignUpForm(): void {

        this.signUpForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
            password: ['', Validators.required],
            confirmPassword: ['', CustomValidators.match('password')]
        });
    }

    /**
     * SignIn
     * @param {SignInForm} value
     * @param {boolean} valid
     */
    signUp({ value, valid }: { value: ISignUpForm, valid: boolean }): void {
        if (!valid) {
            return;
        }

        this.isLoading = true;

        const signUpForm: SignUpForm = {
            username: value.username,
            email: value.email,
            password: value.password
        };

        this.authService.signUp(signUpForm)
            .subscribe(
                () => this.isLoading = false,
                () => {
                    this.isLoading = false;
                }
            );
    }

    login () {
        this.router.navigate(['/sign-in']);
    }
}

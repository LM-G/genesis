import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SignInForm } from '../../core/api/auth/form/sign-in';
import { AuthService } from '../../core/api/auth/auth.service';
import { SignUpForm } from '../../core/api/auth/form/sign-up';

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    isLoading = false;
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('# SignUpComponent started');
        this.signUpForm = SignUpForm.create();
    }

    /**
     * SignIn
     * @param {SignInForm} value
     * @param {boolean} valid
     */
    signUp({ value, valid }: { value: SignUpForm, valid: boolean }): void {
        if (!valid) {
            return;
        }

        this.isLoading = true;

        this.authService.signUp(value)
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

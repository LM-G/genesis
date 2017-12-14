import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/core/api/auth/auth.service';
import { SignInForm, SignUpForm } from '@genesis/core/api/auth/form';
import { GenesisForm } from '@genesis/shared/factory/genesis-form';

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

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        console.log('# SignUpComponent started');
        this.signUpForm = GenesisForm.create(SignUpForm);
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

        this.authService.signUp(SignUpForm.of(value))
            .subscribe(
                () => this.isLoading = false,
                (err) => {
                    this.isLoading = false;
                }
            );


    }


    login() {
        this.router.navigate([ '/sign-in' ]);
    }
}

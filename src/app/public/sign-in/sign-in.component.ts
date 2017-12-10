import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInForm } from '../../core/api/auth/form/sign-in';
import { AuthService } from '../../core/api/auth/auth.service';
import { TokensHolder } from '../../core/api/auth/model/tokens-holder';

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        console.log('# SignInComponent started');
        this.signInForm = SignInForm.create();
    }

    register(): void {
        this.router.navigate(['/sign-up']);
    }

    /**
     * SignIn
     * @param {SignInForm} value
     * @param {boolean} valid
     */
    signIn({ value, valid }: { value: SignInForm, valid: boolean }) {
        if (!valid) {
            return;
        }

        this.authService.signIn(value).subscribe(
            registerTokens,
            (err) => console.log('## signIn : erreur ', err),
            () => console.log('## signIn : done')
        );

        function registerTokens({accessToken, refreshToken} : TokensHolder){
            console.log('## signIn : connection réussie ', accessToken, refreshToken)
        }
    }
}

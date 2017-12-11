import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/core/api/auth/auth.service';
import { SignInForm } from '@genesis/core/api/auth/form';
import { TokensHolder } from '@genesis/core/api/auth/model/tokens-holder';
import { GenesisForm } from '@genesis/shared/factory/genesis-form';

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

    constructor(private router: Router,
                private authService: AuthService) { }

    ngOnInit(): void {
        console.log('# SignInComponent started');
        this.signInForm = GenesisForm.create(SignInForm);
    }

    register(): void {
        this.router.navigate([ '/sign-up' ]);
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

        function registerTokens({ accessToken, refreshToken }: TokensHolder) {
            console.log('## signIn : connection réussie ', accessToken, refreshToken);
        }
    }
}

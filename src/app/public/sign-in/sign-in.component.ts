import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/core/api/auth/auth.service';
import { SignInForm } from '@genesis/core/api/auth/form';
import { TokensHolder } from '@genesis/core/api/auth/model/tokens-holder';
import { UserService } from '@genesis/core/api/user/user.service';
import { AppStore } from '@genesis/core/store/app-store';
import { GenesisForm } from '@genesis/shared/factory/genesis-form';
import { User } from '@genesis/shared/model/user';
import { finalize, switchMap } from 'rxjs/operators';

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
  isLoading = false;

  constructor(private _router: Router,
              private _authService: AuthService,
              private _userService: UserService,
              private _cdr: ChangeDetectorRef,
              private _appStore: AppStore) {
  }

  ngOnInit(): void {
    console.log('# SignInComponent started');
    this.signInForm = GenesisForm.create(SignInForm);
  }

  /**
   * Connects the current user using the provided credentials
   * @param {SignInForm} value credentials form
   * @param {boolean} valid form status validity
   */
  signIn({ value, valid }: { value: SignInForm, valid: boolean }) {
    if (!valid) {
      return;
    }

    this.startLoading();
    this._authService.signIn(new SignInForm(value))
      .pipe(
        switchMap(({ accessToken, refreshToken }: TokensHolder, index: number) => {
          console.log('## signIn : connection réussie : tokens : ', accessToken, refreshToken, index);
          this._appStore.setTokens({ accessToken, refreshToken });
          return this._userService.me();
        }),
        finalize(() => {
          this.stopLoading();
          this._cdr.markForCheck();
        })
      )
      .subscribe(
        (user: User) => {
          console.log('## signIn : connection réussie : user : ', user);
          this._appStore.setUser(user);
          this._router.navigate([ '/home' ]);
        },
        (err) => console.log('## signIn : erreur ', err)
      );
  }

  private startLoading(): void {
    this.isLoading = true;
  }

  private stopLoading(): void {
    this.isLoading = false;
  }
}

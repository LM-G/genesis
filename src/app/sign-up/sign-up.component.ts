import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/$core/api/auth/auth.service';
import { SignInForm, SignUpForm } from 'app/$core/api/auth/form/index';
import { GenesisForm } from 'app/$shared/factory/genesis-form';
import { finalize } from 'rxjs/operators';

/**
 * Sign up component
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

  constructor(private _router: Router,
              private _authService: AuthService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log('# SignUpComponent started');
    // init the sign-up form
    this.signUpForm = GenesisForm.create(SignUpForm);
  }

  /**
   * Registers the user on database
   * @param {SignInForm} value form to send to server
   * @param {boolean} valid form validity
   */
  signUp({ value, valid }: { value: SignUpForm, valid: boolean }): void {
    if (!valid) {
      return;
    }

    this.startLoading();
    this._authService.signUp(SignUpForm.of(value))
      .pipe(
        finalize(() => {
          this.stopLoading();
          this._cdr.markForCheck();
        })
      )
      .subscribe(
        () => {
          console.log('# signUp SUCCESS');
          this._router.navigate([ '/sign-up/success' ]);
        },
        (err) => {
          console.log('# signUp FAIL', err);
        }
      );
  }

  private startLoading(): void {
    this.isLoading = true;
  }

  private stopLoading(): void {
    this.isLoading = false;
  }
}

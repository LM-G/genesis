import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/$core/api/auth/auth.service';
import { TokensHolder } from '@genesis/$core/api/auth/model/tokens-holder';
import { AppStore } from '@genesis/$core/store/app-store';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer';

const E_EXPIRED_TOKEN = 'E_EXPIRED_TOKEN';

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 *
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _authService: AuthService;
  private _router: Router;

  constructor(private _appStore: AppStore,
              private _injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // WTF https://github.com/angular/angular/issues/18224
    this._authService = this._injector.get(AuthService);
    this._router = this._injector.get(Router);

    const token = this._appStore.tokens;
    if (token.accessToken) {
      const value = `${BEARER} ${token.accessToken}`;
      const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
        : req.headers.append(AUTHORIZATION, value);
      req = req.clone({ headers });
    }

    return next.handle(req).pipe(
      tap(null, err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (err.error && err.error.code === E_EXPIRED_TOKEN) {
                console.warn('## User not authenticated, jwt expired or not valid');
                this.refreshToken();
              }
            }
          }
        }
      )
    );
  }

  private refreshToken(): void {
    const { refreshToken } = this._appStore.tokens;
    if (refreshToken) {
      // TODO resend request with refresh token
      this._authService.refresh(refreshToken)
        .pipe(
          tap(data => console.log('TOKENS REFRESH', data))
        )
        .subscribe(
          (tokens: TokensHolder) => this._appStore.setTokens(tokens),
          () => this.goLogin()
        );
    } else {
      this.goLogin();
    }
  }

  private goLogin() {
    this._appStore.reset();
    this._router.navigate([ '/sign-in' ]);
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/$core/api/auth/auth.service';
import { TokensHolder } from '@genesis/$core/api/auth/model/tokens-holder';
import { AppStore } from '@genesis/$core/store/app-store';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer';

const E_EXPIRED_TOKEN = 'E_EXPIRED_TOKEN';

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokensSubject$: BehaviorSubject<TokensHolder> = new BehaviorSubject<TokensHolder>(null);
  private _authService: AuthService;
  private _router: Router;

  constructor(private _appStore: AppStore,
              private _injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // WTF https://github.com/angular/angular/issues/18224
    this._authService = this._injector.get(AuthService);
    this._router = this._injector.get(Router);

    const authedReq = this.authRequest(req);

    return next.handle(authedReq).pipe(
      catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 && err.error.code === E_EXPIRED_TOKEN) {
              console.warn('## User not authenticated, jwt expired or not valid');
              return this.handle401(req, next);
            }
            throw err.error;
          }
          throw err;
        }
      )
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokensSubject$.next(null);
      return this.refreshToken().pipe(
        finalize(() => this.isRefreshingToken = false),
        switchMap(tokens => {
          this._appStore.setTokens(tokens);
          this.tokensSubject$.next(tokens);
          const reAuthedReq = this.authRequest(req);
          return next.handle(reAuthedReq);
        })
      );
    } else {
      return this.tokensSubject$.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          const reAuthedReq = this.authRequest(req);
          return next.handle(reAuthedReq);
        })
      );
    }
  }

  private authRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this._appStore.tokens;
    if (token.accessToken) {
      const value = `${BEARER} ${token.accessToken}`;
      const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
        : req.headers.append(AUTHORIZATION, value);
      req = req.clone({ headers });
    }
    return req;
  }

  private refreshToken(): Observable<TokensHolder> {
    const { refreshToken } = this._appStore.tokens;
    if (refreshToken) {
      return this._authService.refresh(refreshToken)
        .pipe(
          catchError(() => this.goSignIn())
        );
    } else {
      return this.goSignIn();
    }
  }

  private goSignIn(): Observable<any> {
    this._appStore.reset();
    return fromPromise(this._router.navigate([ '/sign-in' ]))
      .pipe(
        map(() => Observable.throw('User not authenticated'))
      );
  }
}

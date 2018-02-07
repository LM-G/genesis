import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/$core/api/auth/auth.service';
import { AppStore } from '@genesis/$core/store/app-store';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map, switchMap } from 'rxjs/operators';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer';

const E_EXPIRED_TOKEN = 'E_EXPIRED_TOKEN';

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _authService: AuthService;
  private _router: Router;
  private pending;

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
              return this.refreshToken(req, next);
            }
            throw err.error;
          }
          throw err;
        }
      )
    );
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

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { refreshToken } = this._appStore.tokens;
    if (refreshToken) {
      return this._authService.refresh(refreshToken)
        .pipe(
          switchMap(tokens => {
            this._appStore.setTokens(tokens);
            const authedReq = this.authRequest(req);
            return next.handle(authedReq);
          }),
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

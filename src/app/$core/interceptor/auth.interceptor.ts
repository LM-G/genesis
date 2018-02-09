import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@genesis/$core/api/auth/auth.service';
import { TokensHolder } from '@genesis/$core/api/auth/model/tokens-holder';
import { AppStore } from '@genesis/$core/store/app-store';
import { NotificationsService } from 'angular2-notifications';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer';
const E_EXPIRED_TOKEN = 'E_EXPIRED_TOKEN';

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 * https://github.com/angular/angular/issues/18224 => Can't inject angular dependency in interceptor ...
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokensSubject$: BehaviorSubject<TokensHolder> = new BehaviorSubject<TokensHolder>(null);

  constructor(private _appStore: AppStore,
              private _notificationsService: NotificationsService,
              private _injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.addJwt(req, next).pipe(
      catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 && err.error.code === E_EXPIRED_TOKEN) {
              return this.handle401(req, next);
            }
            this._notificationsService.error('Erreur', err.error.message);
            throw err.error;
          }
          throw err;
        }
      )
    );
  }

  /**
   * Adds a JWT on the outgoing request header and then provides the updated request to the next handler
   * @param {HttpRequest<any>} req outgoing request
   * @param {HttpHandler} next next http handler
   * @returns {Observable<HttpEvent<any>>} response stream
   */
  private addJwt(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._appStore.tokens;
    if (token.accessToken) {
      const value = `${BEARER} ${token.accessToken}`;
      const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
        : req.headers.append(AUTHORIZATION, value);
      req = req.clone({ headers });
    }
    return next.handle(req);
  }

  /**
   * Process error 401 request
   * @param {HttpRequest<any>} req request to process
   * @param {HttpHandler} next next http handler
   * @returns {Observable<HttpEvent<any>>} response stream
   */
  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let process$: Observable<TokensHolder>;
    const authService = this._injector.get(AuthService);
    const { refreshToken } = this._appStore.tokens;

    // if no refresh token is stored
    if (!refreshToken) {
      return this.signOut(); // disconnects the user
    }

    // if there is no pending request for refreshing tokens
    if (!this.isRefreshingToken) {
      // starts the refresh processus
      this.isRefreshingToken = true;
      this.tokensSubject$.next(null);
      process$ = authService.refresh(refreshToken).pipe(
        // stops the refresh processus
        finalize(() => this.isRefreshingToken = false),
        catchError(() => this.signOut()),
        tap(tokens => {
          this._appStore.setTokens(tokens);
          // notify the tokens observable with the new tokens, it will trigger the other pending request
          this.tokensSubject$.next(tokens);
        })
      );
    } else {
      // when refresh processus is running, waits for its completion for send the request
      process$ = this.tokensSubject$.pipe(
        filter(token => token != null),
        take(1)
      );
    }

    // executes the refresh request or the pending requests needing authentication
    return process$.pipe(
      switchMap(() => this.addJwt(req, next))
    );
  }

  /**
   * TEMP disconnect the user and redirects him on sign-in page
   * @returns {Observable<any>}
   */
  private signOut(): Observable<any> {
    this._appStore.reset();
    const router = this._injector.get(Router);
    return fromPromise(router.navigate([ '/sign-in' ]))
      .pipe(
        map(() => Observable.throw('User not authenticated'))
      );
  }
}

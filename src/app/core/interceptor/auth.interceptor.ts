import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppStore } from '@genesis/core/store/app-store';
import { NotificationsService } from 'angular2-notifications';
import { isEmpty } from 'lodash';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer';

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _notificationsService: NotificationsService,
              private _userStore: AppStore) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._userStore.tokens;
    if (token.accessToken) {
      const value = `${BEARER} ${token.accessToken}`;
      const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
        : req.headers.append(AUTHORIZATION, value);
      req = req.clone({ headers });
    }

    return next.handle(req).do(null, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.warn('## User not authenticated, jwt expired or not valid');
          }
          this._notificationsService.error('Erreur', err.error.message);
        }

      }
    );
  }
}

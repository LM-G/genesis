import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '../store/local-storage';
import { isEmpty } from 'lodash';
import 'rxjs/add/operator/do';
import { NotificationsService } from 'angular2-notifications';

const AUTHORIZATION = "Authorization";
const BEARER = "Bearer";

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private notificationsService: NotificationsService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = LocalStorage.token;
        if(token) {
            const value = `${BEARER} ${token}`;
            const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
                : req.headers.append(AUTHORIZATION, value);
            req = req.clone({headers});
        }

        return next.handle(req)
            .do(null,
                err => {
                    if(err instanceof HttpErrorResponse) {
                        if ( err.status === 401 ) {
                            console.warn('## User not authenticated, jwt expired or not valid');
                        }
                    }
                    this.notificationsService.error('Erreur', err.statusText);
                }
            );
    }
}

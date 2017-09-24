import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '../store/local-storage';
import { isEmpty } from 'lodash';
import 'rxjs/add/operator/map';

const AUTHORIZATION = "Authorization";
const BEARER = "Bearer";

/**
 * Add JWT token if present in local storage on all outgoing requests and intercepts all auth rejection errors
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = LocalStorage.token;
        if(token) {
            const value = `${BEARER} ${token}`;
            const headers: HttpHeaders = isEmpty(req.headers) ? new HttpHeaders().set(AUTHORIZATION, value)
                : req.headers.append(AUTHORIZATION, value);
            req = req.clone({headers});
        }

        return next.handle(req)
            .map((evt: HttpResponse<any>) => {
                if ( evt.status === 401 ) {
                    console.warn('## User not authenticated, jwt expired or not valid');
                }
                return evt
            });
    }
}

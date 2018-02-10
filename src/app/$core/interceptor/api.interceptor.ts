import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { isObject } from 'rxjs/util/isObject';

const BASE_URL_API = 'api/v1';

/**
 * Prefixes all request by the server api base url
 */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: BASE_URL_API + req.url });
    return next.handle(apiReq).pipe(
      // final error handler, extract err.error object for the potential next error handler in subscriber
      catchError(err => ErrorObservable.create(isObject(err.error) ? err.error : err))
    );
  }
}

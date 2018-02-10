import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { isObject } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

/**
 * Prefixes all request by the server api base url
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // handles all incoming erroneous requests
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          let message: string;
          switch (err.status) {
            case 504: {
              message = `Le serveur n'est pas démarré`;
              break;
            }
            default:
              message = isObject(err.error) ? err.error.message : 'Une erreur est survenue';
          }
          // displays a notification
          this._notificationsService.error('Erreur', message);
        }
        // then delegates the error to next error handler
        return ErrorObservable.create(err);
      })
    );
  }
}

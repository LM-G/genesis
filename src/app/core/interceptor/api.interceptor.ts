import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

const BASE_URL_API = 'api/v1';

/**
 * Prefixes all request by the server api base url
 */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        const apiReq = req.clone({ url: BASE_URL_API + req.url });
        return next.handle(apiReq).do(event => {
            if(event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log(`## Request for ${req.urlWithParams} took ${elapsed} ms.`);
            }
        });
    }
}

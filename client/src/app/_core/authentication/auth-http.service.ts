import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Http wrapper to provide access token in each header request if it is present in local storage
 */
@Injectable()
export class AuthHttpService extends Http {
    constructor(backend: XHRBackend, options: RequestOptions) {
        let token = localStorage.getItem('access_token');
        options.headers.set('Authorization', `Bearer ${token}`);
        super(backend, options);
    }

    // Override http base request function with our custom one which will add JWT token to header
    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = localStorage.getItem('access_token');
        if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
            if (!options) {
                // let's make option object
                options = { headers: new Headers() };
            }
            options.headers.set('Authorization', `JWT ${token}`);
        } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', `JWT ${token}`);
        }
        return super.request(url, options).catch(this.catchAuthError());
    }

    private catchAuthError() {
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                console.warn('User not authenticated :', res);
            }
            return Observable.throw(res);
        };
    }
}
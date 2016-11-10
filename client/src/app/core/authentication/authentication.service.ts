import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from '../../shared/models/user.model';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    /**
     * Try to log in a user, with a username and a password. First the function gets a valid token if the authentication
     * succeed and set it in the browser's localstorage. Then it gets the user informations.
     *
     * @param username
     * @param password
     *
     * @returns {Observable<boolean>}
     */
    login(username: string, password: string): Observable<User> {
        let credentials = JSON.stringify({username: username, password: password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/auth/login', credentials, options)
            .map((res: Response) => {
                /* todo set token dans localstorage ici res.json().token.access_token et mettre en place l'interception
                 * de requete
                 * @see: https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/02-Custom-Login*/
                return res.json();
            })
            .flatMap((token) => this.http.get('/api/user').map((res: Response) => {
                let user: User = res.json();
                return new User(user.id, user.username, user.email, user.role);
            }))
            .catch((err: any) => Observable.throw(err || 'Server error'));
    }
}

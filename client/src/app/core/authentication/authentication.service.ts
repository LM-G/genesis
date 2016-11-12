import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../../shared/models/user.model';
import { TokenMessage } from '../../shared/models/token-message.model';
import { UserService } from '../user.service';

/**
 * Authentication service, get access token, log in orlog out a user
 */
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private userService: UserService) {
    }

    /**
     * Try to log in a user, with a username and a password. First the function gets a valid token if the authentication
     * succeed and set it in the browser's localstorage. Then it gets the user informations.
     *
     * @param username
     * @param password
     *
     * @returns {Observable<User>}
     */
    login(username: string, password: string): Observable<User> {
        let credentials = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        /* get the access token */
        return this.http.post('/auth/login', credentials, options)
            .map((res: Response) => {
                let data: TokenMessage = res.json();
                let token: string = data.token.access_token;
                if (token != null) {
                    localStorage.setItem('access_token', token);
                }
            })
            /* get the user informations thanks to the token */
            .flatMap(() => this.userService.getUser().map((user: User) => {
                return new User(user.id, user.username, user.email, user.role);
            }))
            .catch((err: any) => Observable.throw(err || 'Server error'));
    }

    /**
     * Disconnects the current user
     */
    logout(): void {
        console.log('User disconnected.');
        localStorage.removeItem('access_token');
        this.userService.user = null;
    }

    /**
     * Determines if the user is connected
     * @returns {boolean} true if the user is connected
     */
    loggedIn(): boolean {
        return this.userService.user != null;
    }

    /**
     * Determines if the user is not connected
     * @returns {boolean} true if the user is not connected
     */
    notLoggedIn(): boolean {
        return this.userService.user == null;
    }
}

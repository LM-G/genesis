import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../../shared/models/user.model';
import { TokenMessage } from '../../shared/models/token-message.model';
import { UserService } from '../user.service';
import { GenesisCore } from '../core.service';

/**
 * Handles user login mechanisms.
 */
@Injectable()
export class AuthenticationService {
    // redirect url if user wanted to access protected route before being displayed the login form
    public redirectUrl : String;

    constructor(private http: Http,
                private userService: UserService,
                private genesis: GenesisCore) {
    }

    /**
     * Tries to log in a user, with a username and a password. First the function gets a valid token if the authentication
     * succeed and set it in the browser's local storage. Then it gets the user basic information.
     *
     * @param username user name
     * @param password user password
     *
     * @returns {Observable<User>} response with user basic information
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
            /* get the user information thanks to the token */
            .flatMap(() => this.userService.getUser().map((user: User) => {
                return new User(user.id, user.username, user.email, user.role);
            }))
            .catch((err: any) => Observable.throw(err || 'Server error'));
    }

    /**
     * Disconnects the current user and cleans access token.
     */
    logout(): void {
        console.log('User disconnected.');
        localStorage.removeItem('access_token');
        this.genesis.setUser(null);
        this.redirectUrl = null;
    }

    /**
     * Determines if the user is connected
     * @returns {boolean} true if the user is connected
     */
    loggedIn(): boolean {
        return this.genesis.getUser() != null;
    }

    /**
     * Determines if the user is not connected
     * @returns {boolean} true if the user is not connected
     */
    notLoggedIn(): boolean {
        return this.genesis.getUser() == null;
    }
}

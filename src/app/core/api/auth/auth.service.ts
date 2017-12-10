import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm } from './form/sign-in';
import { Observable } from 'rxjs/Observable';
import { SignUpForm } from './form/sign-up';
import { TokensHolder } from './model/tokens-holder';

import 'rxjs/add/operator/first';

const AUTH_PATH = '/auth';

@Injectable()
export class AuthService {
    /**
     * Auth api's constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    signIn (form: SignInForm): Observable<TokensHolder> {
        return this.http.post<TokensHolder>(AUTH_PATH + '/sign-in', form).first();
    }

    signUp (form: SignUpForm): Observable<void> {
        return this.http.post<void>(AUTH_PATH + '/sign-up', form);
    }
}

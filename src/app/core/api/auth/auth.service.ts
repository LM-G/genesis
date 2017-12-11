import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm, SignUpForm } from '@genesis/core/api/auth/form';
import { TokensHolder } from '@genesis/core/api/auth/model/tokens-holder';
import 'rxjs/add/operator/first';

import { Observable } from 'rxjs/Observable';


const AUTH_PATH = '/auth';

@Injectable()
export class AuthService {
    /**
     * Auth api's constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    signIn(form: SignInForm): Observable<TokensHolder> {
        return this.http.post<TokensHolder>(AUTH_PATH + '/sign-in', form).first();
    }

    signUp(form: SignUpForm): Observable<void> {
        return this.http.post<void>(AUTH_PATH + '/sign-up', form);
    }
}

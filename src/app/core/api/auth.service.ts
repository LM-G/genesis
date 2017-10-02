import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm } from '../../shared/form/sign-in';
import { Observable } from 'rxjs/Observable';
import { SignUpForm } from '../../shared/form/sign-up';

const PATH = '/auth';

@Injectable()
export class AuthService {
    /**
     * Auth api's constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    signIn (form: SignInForm): Observable<String> {
        return this.http.post(PATH + '/sign-in', form).map(({token}: {token: string }) => token);
    }

    signUp (form: SignUpForm): Observable<void> {
        return this.http.post<void>(PATH + '/sign-up', form);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm } from '../../shared/form/sign-in';
import { Observable } from 'rxjs/Observable';

const PATH = '/auth';

@Injectable()
export class AuthService {
    /**
     * Auth service's constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    signIn (form: SignInForm): Observable<String> {
        return this.http.post(PATH + '/sign-in', form).map(({token}: {token: string }) => token);
    }

    signUp () {
        return this.http.post(PATH + '/sign-up', null);
    }
}

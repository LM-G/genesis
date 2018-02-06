import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm, SignUpForm } from '@genesis/$core/api/auth/form';
import { TokensHolder } from '@genesis/$core/api/auth/model/tokens-holder';
import 'rxjs/add/operator/first';

import { Observable } from 'rxjs/Observable';


const AUTH_PATH = '/auth';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  signIn(form: SignInForm): Observable<TokensHolder> {
    return this._http.post<TokensHolder>(AUTH_PATH + '/sign-in', form);
  }

  signUp(form: SignUpForm): Observable<void> {
    return this._http.post<void>(AUTH_PATH + '/sign-up', form);
  }

  refresh(refreshToken: string): Observable<TokensHolder> {
    const queryParams = new HttpParams().set('token', refreshToken);
    return this._http.get<TokensHolder>(AUTH_PATH + '/refresh', { params: queryParams });
  }
}

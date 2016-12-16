import { Injectable } from '@angular/core';
import { AuthHttpService } from './authentication/auth-http.service';
import { User } from '../_shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    /* Current user */
    public user: User;
    private jwtHelper: JwtHelper;

    constructor(private authHttp: AuthHttpService) {
        const token = localStorage.getItem('access_token');
        this.jwtHelper = new JwtHelper();

        //  if token is present in local storage then try to get user informations if token is valid
        if(_.isString(token) && !this.jwtHelper.isTokenExpired(token) ){
            this.getUser().first().subscribe((user : User) => {
               this.user = user;
            });
        }
    }

    getUser(): Observable<User> {
        return this.authHttp.get('/api/user').map((res: Response) => res.json());
    }
}
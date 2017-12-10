import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/model/user';

const PATH = '/users';

/**
 * User's api
 */
@Injectable()
export class UserService {
    /**
     * User api's constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    me (): Observable<User> {
        return this.http.get<User>(PATH);
    }
}

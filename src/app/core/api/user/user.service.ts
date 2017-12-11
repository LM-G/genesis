import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@genesis/shared/model/user';
import { Observable } from 'rxjs/Observable';

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

    me(): Observable<User> {
        return this.http.get<User>(PATH);
    }
}

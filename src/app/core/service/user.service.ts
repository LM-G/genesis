import { Injectable } from '@angular/core';
import { User } from '../../shared/model/user';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AuthHttpService } from '../component/authentication/auth-http.service';

const PATH = '/';
/**
 * User's service
 */
@Injectable()
export class UserService {
    /**
     * User service's constructor
     * @param authHttp to get current logged in user information
     */
    constructor(private authHttp: AuthHttpService) {}

    getUser(): Observable<User> {
        return this.authHttp.get('/api/user').map((res: Response) => res.json());
    }
}
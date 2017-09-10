import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AuthHttpService } from './authentication/auth-http.service';

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
import { Injectable } from '@angular/core';
import { AuthHttpService } from './authentication/auth-http.service';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class UserService {
    /* Current*/
    public user: User;

    constructor(private authHttp: AuthHttpService) {

    }

    getUser(): Observable<User> {
        return this.authHttp.get('/api/user').map((res: Response) => res.json());
    }
}
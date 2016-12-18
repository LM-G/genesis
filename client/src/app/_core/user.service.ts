import { Injectable } from '@angular/core';
import { User } from '../_shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AuthHttpService } from './authentication/auth-http.service';


@Injectable()
export class UserService {
    constructor(private authHttp: AuthHttpService) {}

    getUser(): Observable<User> {
        return this.authHttp.get('/api/user').map((res: Response) => res.json());
    }
}
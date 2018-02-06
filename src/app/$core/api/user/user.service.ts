import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@genesis/$shared/model/user';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

const PATH = '/users';

/**
 * User's api
 */
@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  /**
   * Gets the current user data
   * @returns {Observable<User>} User observable
   */
  me(): Observable<User> {
    return this._http.get<User>(PATH + '/me')
      .pipe(
        tap((user: User) => console.log('* Utilisateur récupéré :', user))
      );
  }
}

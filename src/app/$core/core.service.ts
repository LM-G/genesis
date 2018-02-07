import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@genesis/$core/api/user/user.service';
import { AppStore } from '@genesis/$core/store/app-store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map, tap } from 'rxjs/operators';

/**
 * Core service, initialize app important stuff first before launching it
 */
@Injectable()
export class CoreService {
  private _router: Router;

  constructor(private _appStore: AppStore,
              private _userService: UserService,
              private _injector: Injector) {}

  initialize(): Promise<any[]> {
    this._router = this._injector.get(Router);
    const initSequence: Observable<any>[] = [];
    if (this._appStore.tokens.accessToken) {
      initSequence.push(this.retrieveUser());
    }
    return forkJoin(initSequence).toPromise();
  }

  private retrieveUser(): Observable<any> {
    return this._userService.me()
      .pipe(
        catchError(() => {
          this._appStore.reset();
          return fromPromise(this._router.navigate([ '/sign-in' ])).pipe(
            map(() => empty())
          );
        }),
        tap(user => this._appStore.setUser(user))
      );
  }
}

/**
 * Factory for initializing the coreService
 * @param {CoreService} coreService
 * @returns core service initialization promises
 */
export function coreInitializerFactory(coreService: CoreService) {
  return () => coreService.initialize();
}

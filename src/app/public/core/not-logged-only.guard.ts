import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotLoggedOnlyGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;

      const canGo = true;

      console.log('# NotLoggedOnlyGuard :: can activate ', url, ' ? : ', canGo, state);

      if (!canGo) {
          this.router.navigate(['/home']);
      }

      return canGo;
  }
}

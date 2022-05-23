import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  constructor(public _AuthService: AuthService, public _Router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loggedIn = this._AuthService.loggedIn();
    if (loggedIn) return true;
    this._Router.navigateByUrl('');
    return false;
  }
}
